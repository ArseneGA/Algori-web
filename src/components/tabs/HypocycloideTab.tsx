import React, { useState, useCallback } from 'react';
import { CurveType, HypocycloideParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useAnimation } from '../../hooks/useAnimation';

const HypocycloideTab: React.FC<{ curveType: CurveType }> = () => {
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [params, setParams] = useState<HypocycloideParams>({
    R: 5,      // Rayon du grand cercle
    r: 2,      // Rayon du petit cercle
    tours: 1,  // Nombre de tours
    points: 1000
  });

  const { 
    isAnimating, 
    toggleAnimation, 
    selectedParams,
    toggleParam,
    setStepSize,
    getStepSize,
    stepsPerSecond,
    setStepsPerSecond
  } = useAnimation(params, setParams);

  const generatePoints = useCallback(() => {
    const points: [number, number][] = [];
    const { R, r, tours, points: numPoints } = params;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * tours * 2 * Math.PI;
      
      // Équations paramétriques de l'hypocycloïde
      const x = (R - r) * Math.cos(t) + r * Math.cos((R - r) * t / r);
      const y = (R - r) * Math.sin(t) - r * Math.sin((R - r) * t / r);

      points.push([x, y]);
    }

    return points;
  }, [params]);

  const handleParamChange = (paramName: keyof HypocycloideParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const fileName = `Hypocycloide_R${params.R}_r${params.r}_tours${params.tours}_pts${params.points}.svg`
      .replace(/\./g, 'p');
    
    saveSvg2D(points, fileName);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gradient-to-b from-black to-zinc-900 min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-900/25 to-black -z-10"></div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Hypocycloïde
            </h2>
            <InfoButton {...curveInfo.hypocycloide} />
          </div>
          <div className="flex items-center space-x-4">
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
            {selectedParams.size > 0 && (
              <div className="flex items-center space-x-2">
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
        </div>
        <Link 
          to="/curves" 
          className="inline-flex items-center text-zinc-400 hover:text-white transition-all duration-300 group px-4 py-2 rounded-lg border border-zinc-800/50 hover:border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-4px] transition-transform" />
          Retour aux courbes
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-2 lg:order-1 space-y-8">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/50 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Paramètres</h3>
            <div className="space-y-6">
              {Object.entries(params).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-white">
                      {getParameterLabel(key)}
                    </label>
                    {key !== 'points' && (
                      <div className="flex items-center space-x-4 ml-auto">
                        <button
                          onClick={() => toggleParam(key as keyof HypocycloideParams)}
                          className={`px-3 py-1 rounded-md text-xs transition-colors ${
                            selectedParams.has(key as keyof HypocycloideParams)
                              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                              : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800/70'
                          }`}
                        >
                          Animer
                        </button>
                        {selectedParams.has(key as keyof HypocycloideParams) && (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={getStepSize(key)}
                              onChange={(e) => setStepSize(key, Number(e.target.value))}
                              min={0.1}
                              max={10}
                              step={0.1}
                              className="w-16 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center text-xs focus:outline-none focus:border-zinc-600"
                            />
                            <span className="text-xs text-zinc-400">pas</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <input
                      type="range"
                      min={getParameterMin(key)}
                      max={getParameterMax(key)}
                      step={getParameterStep(key)}
                      value={value}
                      onChange={(e) => handleParamChange(key as keyof HypocycloideParams, parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleParamChange(key as keyof HypocycloideParams, parseFloat(e.target.value))}
                      step={getParameterStep(key)}
                      min={getParameterMin(key)}
                      max={getParameterMax(key)}
                      className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  {key === 'R' && params.r && (
                    <div className="mt-1 text-sm text-zinc-400">
                      k = R/r = {(params.R / params.r).toFixed(2)}
                      {Number.isInteger(params.R / params.r) && 
                        ` (${params.R / params.r} cusps)`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800/50 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Style et Export</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <label className="text-sm font-medium text-white mb-2 block">
                  Épaisseur du trait
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    min="1"
                    max="10"
                    className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Couleur du trait
                  </label>
                  <div className="flex items-center space-x-4">
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
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    Couleur du fond
                  </label>
                  <div className="flex items-center space-x-4">
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
              
              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={handleExportSVG}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Exporter en SVG</span>
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

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

const getParameterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    R: 'Rayon du grand cercle (R)',
    r: 'Rayon du petit cercle (r)',
    tours: 'Nombre de tours',
    points: 'Nombre de points'
  };
  return labels[key] || key;
};

const getParameterMin = (key: string): number => {
  const mins: Record<string, number> = {
    R: 1,
    r: 0.1,
    tours: 0.1,
    points: 100
  };
  return mins[key] || 0;
};

const getParameterMax = (key: string): number => {
  const maxs: Record<string, number> = {
    R: 10,
    r: 5,
    tours: 10,
    points: 10000
  };
  return maxs[key] || 100;
};

const getParameterStep = (key: string): number => {
  const steps: Record<string, number> = {
    R: 0.1,
    r: 0.1,
    tours: 0.1,
    points: 100
  };
  return steps[key] || 1;
};

export default HypocycloideTab; 