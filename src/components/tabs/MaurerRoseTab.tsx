import React, { useState, useCallback } from 'react';
import { CurveType, MaurerRoseParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MaurerRoseTab: React.FC<{ curveType: CurveType }> = () => {
  const [params, setParams] = useState<MaurerRoseParams>({
    n: 6,    // Nombre de segments
    d: 71,   // Angle en degrés
    k: 2,    // Paramètre de forme
    points: 1000
  });

  const generatePoints = useCallback(() => {
    const points: [number, number][] = [];
    const { n, d, k, points: numPoints } = params;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * 360; // Angle en degrés
      const thetaRad = (theta * Math.PI) / 180; // Conversion en radians
      const thetaN = n * d * thetaRad; // θn = n⋅d

      // Équations paramétriques de la rose de Maurer
      const x = Math.sin(k * thetaN) * Math.cos(thetaN);
      const y = Math.sin(k * thetaN) * Math.sin(thetaN);

      points.push([x, y]);
    }

    return points;
  }, [params]);

  const handleParamChange = (paramName: keyof MaurerRoseParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const fileName = `MaurerRose_n${params.n}_d${params.d}_k${params.k}_pts${params.points}.svg`
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rose de Maurer</h2>
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
                  onChange={(e) => handleParamChange(key as keyof MaurerRoseParams, parseFloat(e.target.value))}
                  className="w-full dark:bg-dark"
                />
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleParamChange(key as keyof MaurerRoseParams, parseFloat(e.target.value))}
                  step={getParameterStep(key)}
                  min={getParameterMin(key)}
                  max={getParameterMax(key)}
                  className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                />
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

const getParameterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    n: 'Nombre de segments (n)',
    d: 'Angle en degrés (d)',
    k: 'Paramètre de forme (k)',
    points: 'Nombre de points'
  };
  return labels[key] || key;
};

const getParameterMin = (key: string): number => {
  const mins: Record<string, number> = {
    n: 1,
    d: 1,
    k: 1,
    points: 100
  };
  return mins[key] || 0;
};

const getParameterMax = (key: string): number => {
  const maxs: Record<string, number> = {
    n: 20,
    d: 180,
    k: 10,
    points: 10000
  };
  return maxs[key] || 100;
};

const getParameterStep = (key: string): number => {
  const steps: Record<string, number> = {
    n: 1,
    d: 1,
    k: 0.1,
    points: 100
  };
  return steps[key] || 1;
};

export default MaurerRoseTab; 