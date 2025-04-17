import React, { useState, useCallback } from 'react';
import { CurveType, MaurerRoseBisParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft, Play, Pause, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useAnimation } from '../../hooks/useAnimation';

const defaultStepSize = 0.1;

const MaurerRoseBisTab: React.FC<{ curveType: CurveType }> = () => {
  const [strokeColor, setStrokeColor] = useState('#0000FF');
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [showSecondCurve, setShowSecondCurve] = useState(true);
  const [secondStrokeColor, setSecondStrokeColor] = useState('#FF0000');
  const [secondStrokeWidth, setSecondStrokeWidth] = useState(4);
  
  const [params, setParams] = useState<MaurerRoseBisParams>({
    n: 5,    // Nombre de pétales
    d: 97,   // Multiplicateur d'angle (comme dans l'exemple)
  });

  const getParameterMin = (key: string): number => {
    const mins: Record<string, number> = {
      n: 1,
      d: 1,
    };
    return mins[key] || 0;
  };

  const getParameterMax = (key: string): number => {
    const maxs: Record<string, number> = {
      n: 36,
      d: 180,
    };
    return maxs[key] || 100;
  };

  const getParameterStep = (key: string): number => {
    const steps: Record<string, number> = {
      n: 1,
      d: 1,
    };
    return steps[key] || 1;
  };

  const { 
    isAnimating, 
    toggleAnimation, 
    selectedParams,
    toggleParam,
    setStepSize,
    stepSizes,
    stepsPerSecond,
    setStepsPerSecond
  } = useAnimation(params, setParams, {
    getParameterMin,
    getParameterMax
  });

  const generatePoints = useCallback(() => {
    const points: [number, number][] = [];
    const { n, d } = params;
    
    // Fixe à 361 points (0 à 360 degrés) comme dans l'exemple Python
    for (let theta = 0; theta <= 360; theta++) {
      // k = theta * d * pi / 180 (comme dans le code Python)
      const k = (theta * d * Math.PI) / 180; // k en radians avec multiplication par d
      
      // Calculer r = sin(nk) où k est en radians
      const r = Math.sin(n * k);
      
      // Convertir de coordonnées polaires (r, k) à coordonnées cartésiennes (x, y)
      const x = 300 * r * Math.cos(k);
      const y = 300 * r * Math.sin(k);

      points.push([x, y]);
    }

    return points;
  }, [params]);

  const generateSecondPoints = useCallback(() => {
    const points: [number, number][] = [];
    const { n } = params;
    
    // Fixe à 361 points (0 à 360 degrés) comme dans l'exemple Python
    for (let theta = 0; theta <= 360; theta++) {
      // k = theta * pi / 180 (sans multiplication par d)
      const k = (theta * Math.PI) / 180; // k en radians sans multiplication par d
      
      // Calculer r = sin(nk) où k est en radians
      const r = Math.sin(n * k);
      
      // Convertir de coordonnées polaires (r, k) à coordonnées cartésiennes (x, y)
      const x = 300 * r * Math.cos(k);
      const y = 300 * r * Math.sin(k);

      points.push([x, y]);
    }

    return points;
  }, [params]);

  const handleParamChange = (paramName: keyof MaurerRoseBisParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const fileName = `MaurerRoseBis_n${params.n}_d${params.d}.svg`
      .replace(/\./g, 'p');
    
    // On utilise la fonction d'export existante pour une seule courbe
    saveSvg2D(points, fileName);
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Rose de Maurer BIS
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="order-2 lg:order-1">
          <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-zinc-800/50 shadow-2xl mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-white">Paramètres</h3>
              <div className="flex items-center gap-4">
                <InfoButton 
                  title={curveInfo.maurerrosebis ? curveInfo.maurerrosebis.title : "Rose de Maurer BIS"} 
                  content={curveInfo.maurerrosebis ? curveInfo.maurerrosebis.content : {
                    description: "La Rose de Maurer BIS est une variante de la Rose polaire où r = sin(nθ). Si n est impair, la rose a n pétales; si n est pair, elle en a 2n.",
                    equations: ["r = sin(nθ)", "(sin(nk), k) pour k = 0, d, 2d, ..., 360d"],
                    cases: ["n impair: n pétales", "n pair: 2n pétales"]
                  }}
                  currentParams={params}
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

            <div className="space-y-4">
              {Object.entries(params).map(([key, value]) => (
                <div key={key}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <label className="text-sm font-medium text-white">
                      {getParameterLabel(key)}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleParam(key as keyof MaurerRoseBisParams)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          selectedParams.has(key as keyof MaurerRoseBisParams)
                            ? 'bg-zinc-800 text-white'
                            : 'bg-zinc-800/50 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {selectedParams.has(key as keyof MaurerRoseBisParams) ? 'Animé' : 'Animer'}
                      </button>
                      {selectedParams.has(key as keyof MaurerRoseBisParams) && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={stepSizes.get(key as string) || defaultStepSize}
                            onChange={(e) => setStepSize(key as keyof MaurerRoseBisParams, Number(e.target.value))}
                            min={0.1}
                            max={10}
                            step={0.1}
                            className="w-16 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-white text-xs text-center focus:outline-none focus:border-zinc-600"
                          />
                          <span className="text-zinc-400 text-xs">pas</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      type="range"
                      min={getParameterMin(key)}
                      max={getParameterMax(key)}
                      step={getParameterStep(key)}
                      value={value}
                      onChange={(e) => handleParamChange(
                        key as keyof MaurerRoseBisParams,
                        parseFloat(e.target.value)
                      )}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleParamChange(
                          key as keyof MaurerRoseBisParams,
                          parseFloat(e.target.value)
                        )}
                        step={getParameterStep(key)}
                        min={getParameterMin(key)}
                        max={getParameterMax(key)}
                        className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-zinc-800/50 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Style et Export</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Afficher la deuxième courbe</span>
                  <button
                    onClick={() => setShowSecondCurve(!showSecondCurve)}
                    className={`p-2 rounded-lg transition-colors ${
                      showSecondCurve
                        ? 'bg-zinc-700 text-white'
                        : 'bg-zinc-800/50 text-zinc-400'
                    }`}
                  >
                    <Layers size={20} />
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Épaisseur du trait (première courbe)
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
                    Couleur du trait (première courbe)
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
                
                {showSecondCurve && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Épaisseur du trait (deuxième courbe)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <input
                          type="range"
                          min={0.05}
                          max={10}
                          step={0.05}
                          value={secondStrokeWidth}
                          onChange={(e) => setSecondStrokeWidth(parseFloat(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <input
                            type="number"
                            value={secondStrokeWidth}
                            onChange={(e) => setSecondStrokeWidth(parseFloat(e.target.value))}
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
                        Couleur du trait (deuxième courbe)
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={secondStrokeColor}
                          onChange={(e) => setSecondStrokeColor(e.target.value)}
                          className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700/50 cursor-pointer hover:border-zinc-600 transition-colors"
                        />
                        <input
                          type="text"
                          value={secondStrokeColor}
                          onChange={(e) => setSecondStrokeColor(e.target.value)}
                          className="w-32 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white uppercase text-center focus:outline-none focus:border-zinc-600"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </>
                )}

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

        <div className="order-1 lg:order-2">
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-2xl">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <CurveVisualization 
                points={generatePoints()}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                strokeWidth={strokeWidth}
                strokeColor={strokeColor}
                backgroundColor={backgroundColor}
              />
              
              {showSecondCurve && (
                <CurveVisualization 
                  points={generateSecondPoints()}
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: 'transparent' }}
                  strokeWidth={secondStrokeWidth}
                  strokeColor={secondStrokeColor}
                  backgroundColor="transparent"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getParameterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    n: 'Nombre de pétales (n)',
    d: 'Multiplicateur d\'angle (d)',
  };
  return labels[key] || key;
};

export default MaurerRoseBisTab; 