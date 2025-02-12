import React, { useState, useCallback } from 'react';
import { CurveType, ExponentialParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg, saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useAnimation } from '../../hooks/useAnimation';

const ExponentialTab: React.FC<{ curveType: CurveType }> = () => {
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [params, setParams] = useState<ExponentialParams>({
    a: [1, 0.5],
    b: [1, 2],
    theta_max: 2 * Math.PI,
    points: 1000,
    n: 2
  });

  const { 
    isAnimating, 
    toggleAnimation, 
    selectedParams,
    toggleParam,
    stepSize,
    setStepSize,
    stepsPerSecond,
    setStepsPerSecond
  } = useAnimation(params, setParams);

  const generatePoints = useCallback(() => {
    const points: [number, number][] = [];
    const { n, a, b, theta_max, points: numPoints } = params;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * theta_max;
      
      // Calcul des coordonnées directement en cartésien
      let x = 0;
      let y = 0;
      
      // Somme des termes pour x et y
      for (let j = 0; j < n; j++) {
        x += a[j] * Math.cos(b[j] * theta);
        y += a[j] * Math.sin(b[j] * theta);
      }

      points.push([x, -y]); // y inversé pour correspondre à l'orientation standard
    }
    return points;
  }, [params]);

  const handleParamChange = (paramName: string, value: number, index?: number) => {
    setParams(prev => {
      if (paramName === 'n') {
        // Ajuster les tableaux a et b en fonction du nombre de termes
        const newA = [...prev.a];
        const newB = [...prev.b];
        while (newA.length < value) {
          newA.push(1);
          newB.push(newA.length);
        }
        return {
          ...prev,
          n: value,
          a: newA.slice(0, value),
          b: newB.slice(0, value)
        };
      } else if (paramName.startsWith('a') && index !== undefined) {
        const newA = [...prev.a];
        newA[index] = value;
        return { ...prev, a: newA };
      } else if (paramName.startsWith('b') && index !== undefined) {
        const newB = [...prev.b];
        newB[index] = value;
        return { ...prev, b: newB };
      } else {
        return { ...prev, [paramName]: value };
      }
    });
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const fileName = `Exponential_n${params.n}_theta${(params.theta_max/Math.PI).toFixed(1)}pi_pts${params.points}.svg`
      .replace(/\./g, 'p');
    
    saveSvg2D(points, fileName);
  };

  const getParameterMin = (key: string): number => {
    const mins: Record<string, number> = {
      n: 1,
      a: 0.1,
      b: 1,
      theta_max: 0.1 * Math.PI,
      points: 100
    };
    return mins[key] || 0;
  };

  const getParameterMax = (key: string): number => {
    const maxs: Record<string, number> = {
      n: 5,
      a: 2,
      b: 10,
      theta_max: 4 * Math.PI,
      points: 10000
    };
    return maxs[key] || 100;
  };

  const getParameterStep = (key: string): number => {
    const steps: Record<string, number> = {
      n: 1,
      a: 0.1,
      b: 0.1,
      theta_max: 0.1,
      points: 100
    };
    return steps[key] || 1;
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header avec titre et bouton retour */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Courbe Exponentielle
          </h1>
          <Link 
            to="/curves" 
            className="inline-flex items-center text-zinc-400 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-4px] transition-transform" />
            Retour aux courbes
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Panneau de contrôle */}
        <div className="order-2 lg:order-1">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-zinc-800/50 shadow-2xl mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-white">Paramètres</h3>
              <div className="flex items-center gap-4">
                <InfoButton 
                  title={curveInfo.exponential.title} 
                  content={curveInfo.exponential.content} 
                />
                <button
                  onClick={toggleAnimation}
                  disabled={selectedParams.size === 0}
                  className={`p-2 rounded-lg transition-colors ${
                    selectedParams.size === 0
                      ? 'bg-zinc-800/50 text-zinc-600 cursor-not-allowed'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                  aria-label={isAnimating ? 'Arrêter l\'animation' : 'Démarrer l\'animation'}
                >
                  {isAnimating ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
            </div>

            {/* Animation speed control */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {selectedParams.size > 0 && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stepsPerSecond}
                    onChange={(e) => setStepsPerSecond(Number(e.target.value))}
                    min={0.1}
                    max={10}
                    step={0.1}
                    className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                  />
                  <span className="text-zinc-400 text-sm">pas/s</span>
                </div>
              )}
            </div>

            {/* Paramètres */}
            <div className="space-y-6">
              {/* Nombre de termes */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Nombre de termes (n)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={params.n}
                    onChange={(e) => handleParamChange('n', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <input
                      type="number"
                      value={params.n}
                      onChange={(e) => handleParamChange('n', parseInt(e.target.value))}
                      min={1}
                      max={5}
                      className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                </div>
              </div>

              {/* Paramètres a et b */}
              {Array.from({ length: params.n }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Longueur a{i} 
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={params.a[i]}
                        onChange={(e) => handleParamChange('a', parseFloat(e.target.value), i)}
                        className="w-full"
                      />
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <input
                          type="number"
                          value={params.a[i]}
                          onChange={(e) => handleParamChange('a', parseFloat(e.target.value), i)}
                          step={0.1}
                          min={0}
                          max={10}
                          className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      Vitesse b{i}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={params.b[i]}
                        onChange={(e) => handleParamChange('b', parseFloat(e.target.value), i)}
                        className="w-full"
                      />
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <input
                          type="number"
                          value={params.b[i]}
                          onChange={(e) => handleParamChange('b', parseFloat(e.target.value), i)}
                          step={0.1}
                          min={0}
                          max={10}
                          className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Angle maximum */}
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Angle maximum (θ)
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="range"
                    min={0.1}
                    max={4}
                    step={0.1}
                    value={params.theta_max / Math.PI}
                    onChange={(e) => handleParamChange(
                      'theta_max',
                      parseFloat(e.target.value) * Math.PI
                    )}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <input
                      type="number"
                      value={(params.theta_max / Math.PI).toFixed(1)}
                      onChange={(e) => handleParamChange(
                        'theta_max',
                        parseFloat(e.target.value) * Math.PI
                      )}
                      step={0.1}
                      min={0.1}
                      max={4}
                      className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                    />
                    <span className="text-white">π</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Style et Export */}
          <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-zinc-800/50 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Style et Export</h3>
            <div className="space-y-6">
              {/* Contrôles de style */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Épaisseur du trait
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      type="range"
                      min={0.05}
                      max={10}
                      step={0.05}
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <input
                        type="number"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                        min={0.05}
                        max={10}
                        step={0.05}
                        className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                      />
                      <span className="text-white">px</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Couleur du trait
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700/50 cursor-pointer hover:border-zinc-600 transition-colors"
                    />
                    <input
                      type="text"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-32 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white uppercase text-center focus:outline-none focus:border-zinc-600"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Couleur de fond
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700/50 cursor-pointer hover:border-zinc-600 transition-colors"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-32 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white uppercase text-center focus:outline-none focus:border-zinc-600"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
              
              {/* Bouton Export */}
              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={handleExportSVG}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Exporter en SVG</span>
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualisation */}
        <div className="order-1 lg:order-2">
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-2xl">
            <CurveVisualization 
              points={generatePoints()}
              style={{ width: '100%', height: '100%' }}
              strokeWidth={strokeWidth}
              strokeColor={strokeColor}
              backgroundColor={backgroundColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExponentialTab; 