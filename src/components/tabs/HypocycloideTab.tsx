import React, { useState, useCallback } from 'react';
import { CurveType, HypocycloideParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HypocycloideTab: React.FC<{ curveType: CurveType }> = () => {
  const [params, setParams] = useState<HypocycloideParams>({
    R: 5,      // Rayon du grand cercle
    r: 2,      // Rayon du petit cercle
    tours: 1,  // Nombre de tours
    points: 1000
  });

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hypocycloïde</h2>
        </div>

        <button
          onClick={handleExportSVG}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
        >
          <span>Exporter en SVG</span>
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="order-2 lg:order-1 space-y-4 bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-sm">
          {Object.entries(params).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                {getParameterLabel(key)}
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                <input
                  type="range"
                  min={getParameterMin(key)}
                  max={getParameterMax(key)}
                  step={getParameterStep(key)}
                  value={value}
                  onChange={(e) => handleParamChange(key as keyof HypocycloideParams, parseFloat(e.target.value))}
                  className="w-full dark:bg-dark"
                />
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleParamChange(key as keyof HypocycloideParams, parseFloat(e.target.value))}
                  step={getParameterStep(key)}
                  min={getParameterMin(key)}
                  max={getParameterMax(key)}
                  className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                />
              </div>
              {key === 'R' && params.r && (
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  k = R/r = {(params.R / params.r).toFixed(2)}
                  {Number.isInteger(params.R / params.r) && 
                    ` (${params.R / params.r} cusps)`}
                </div>
              )}
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