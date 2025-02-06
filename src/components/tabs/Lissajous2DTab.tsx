import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown, Sun, Moon, Play, Pause } from 'lucide-react';
import { CurveType, Curve2DParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../hooks/useAnimation';

const Lissajous2DTab: React.FC<{ curveType: CurveType }> = () => {
  const { theme, toggleTheme } = useTheme();
  const [params, setParams] = useState<Curve2DParams>({
    A: 1,
    B: 1,
    p: 3,
    q: 2,
    delta: 0.5,
    longueur: 2 * Math.PI,
    points: 1000
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
    const { A, B, p, q, delta, longueur, points: numPoints } = params;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * longueur;
      const x = A * Math.sin(p * t + delta * Math.PI);
      const y = B * Math.sin(q * t);
      points.push([x, y]);
    }

    return points;
  }, [params]);

  const handleParamChange = (paramName: keyof Curve2DParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const fileName = `Lissajous2D_A${params.A}_B${params.B}_p${params.p}_q${params.q}_delta${params.delta}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.svg`
      .replace(/\./g, 'p');
    
    saveSvg2D(points, fileName);
  };

  const getParameterLabel = (key: string): string => {
    switch (key) {
      case 'A':
        return 'Amplitude X (A)';
      case 'B':
        return 'Amplitude Y (B)';
      case 'p':
        return 'Fréquence X (p)';
      case 'q':
        return 'Fréquence Y (q)';
      case 'delta':
        return 'Déphasage (δ)';
      default:
        return key;
    }
  };

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 bg-gray-0 dark:bg-dark">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="space-y-4">
          <div className="flex items-center">
            <Link 
              to="/curves" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux courbes
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courbe de Lissajous 2D</h2>
        </div>

        <div className="flex flex-row space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-button-dark text-white hover:bg-button-dark dark:bg-button-dark dark:hover:bg-button-dark transition-colors"
            aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <InfoButton {...curveInfo.lissajous2d} />
          <button
            onClick={handleExportSVG}
            className="px-4 py-2 bg-button-dark text-white rounded-md hover:bg-button-dark dark:bg-button-dark dark:hover:bg-button-dark transition-colors flex items-center space-x-2"
          >
            <span>Exporter en SVG</span>
            <ArrowDown size={16} />
          </button>
          <button
            onClick={toggleAnimation}
            disabled={selectedParams.size === 0}
            className={`p-2 rounded-full transition-colors ${
              selectedParams.size === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-button-dark text-white hover:bg-button-dark dark:bg-button-dark dark:hover:bg-button-dark'
            }`}
            aria-label={isAnimating ? 'Arrêter l\'animation' : 'Démarrer l\'animation'}
          >
            {isAnimating ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="order-2 lg:order-1 space-y-4 bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-sm">
          {Object.entries(params).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 dark:text-white">
                  {key === 'longueur' ? 'Longueur (× π)' : getParameterLabel(key)}
                </label>
                {key !== 'points' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleParam(key as keyof Curve2DParams)}
                      className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        selectedParams.has(key as keyof Curve2DParams)
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-dark-secondary dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Animer
                    </button>
                    {selectedParams.has(key as keyof Curve2DParams) && (
                      <>
                        <input
                          type="number"
                          value={stepSize}
                          onChange={(e) => setStepSize(Number(e.target.value))}
                          min={0.1}
                          max={10}
                          step={0.1}
                          className="w-16 px-2 py-1 border rounded-md text-xs dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                        />
                        <span className="text-xs text-gray-700 dark:text-white">pas</span>
                        <input
                          type="number"
                          value={stepsPerSecond}
                          onChange={(e) => setStepsPerSecond(Number(e.target.value))}
                          min={0.1}
                          max={10}
                          step={0.1}
                          className="w-16 px-2 py-1 border rounded-md text-xs dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                        />
                        <span className="text-xs text-gray-700 dark:text-white">pas/s</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                <input
                  type="range"
                  min={key === 'longueur' ? 0.1 : 0}
                  max={key === 'longueur' ? 4 : key === 'points' ? 10000 : 10}
                  step={key === 'points' ? 100 : 0.1}
                  value={key === 'longueur' ? value / Math.PI : value}
                  onChange={(e) => handleParamChange(
                    key as keyof Curve2DParams,
                    key === 'longueur' 
                      ? parseFloat(e.target.value) * Math.PI 
                      : parseFloat(e.target.value)
                  )}
                  className="w-full dark:bg-dark"
                />
                <div className="flex items-center w-24">
                  <input
                    type="number"
                    value={key === 'longueur' ? (value / Math.PI).toFixed(1) : value}
                    onChange={(e) => handleParamChange(
                      key as keyof Curve2DParams,
                      key === 'longueur' 
                        ? parseFloat(e.target.value) * Math.PI 
                        : parseFloat(e.target.value)
                    )}
                    step={key === 'points' ? 100 : 0.1}
                    min={key === 'longueur' ? 0.1 : 0}
                    max={key === 'longueur' ? 4 : key === 'points' ? 10000 : 10}
                    className="w-20 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                  />
                  {key === 'longueur' && <span className="ml-1 dark:text-white">π</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-white dark:bg-dark-secondary rounded-lg shadow-lg visualization-container">
            <CurveVisualization 
              points={generatePoints()}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lissajous2DTab;
