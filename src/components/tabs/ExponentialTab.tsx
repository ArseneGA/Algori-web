import React, { useState, useCallback } from 'react';
import { CurveType, ExponentialParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg, saveSvg2D } from '../../utils/export';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExponentialTab: React.FC<{ curveType: CurveType }> = () => {
  const [params, setParams] = useState<ExponentialParams>({
    n: 2,
    a: [1, 0.5],
    b: [1, 2],
    theta_max: 2 * Math.PI,
    points: 1000
  });

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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courbe Exponentielle</h2>
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
          {/* Nombre de termes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Nombre de termes (n)
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
              <input
                type="range"
                min={getParameterMin('n')}
                max={getParameterMax('n')}
                step={getParameterStep('n')}
                value={params.n}
                onChange={(e) => handleParamChange('n', parseInt(e.target.value))}
                className="w-full dark:bg-dark"
              />
              <input
                type="number"
                value={params.n}
                onChange={(e) => handleParamChange('n', parseInt(e.target.value))}
                min={getParameterMin('n')}
                max={getParameterMax('n')}
                step={getParameterStep('n')}
                className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          {/* Paramètres pour chaque terme */}
          {Array.from({ length: params.n }).map((_, i) => (
            <div key={i} className="space-y-4 border-t dark:border-gray-700 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-white">Terme {i + 1}</h3>
              
              {/* Longueur ai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Longueur a{i + 1}
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                  <input
                    type="range"
                    min={getParameterMin('a')}
                    max={getParameterMax('a')}
                    step={getParameterStep('a')}
                    value={params.a[i]}
                    onChange={(e) => handleParamChange('a', parseFloat(e.target.value), i)}
                    className="w-full dark:bg-dark"
                  />
                  <input
                    type="number"
                    value={params.a[i]}
                    onChange={(e) => handleParamChange('a', parseFloat(e.target.value), i)}
                    step={getParameterStep('a')}
                    min={getParameterMin('a')}
                    max={getParameterMax('a')}
                    className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                  />
                </div>
              </div>

              {/* Vitesse bi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Vitesse b{i + 1}
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
                  <input
                    type="range"
                    min={getParameterMin('b')}
                    max={getParameterMax('b')}
                    step={getParameterStep('b')}
                    value={params.b[i]}
                    onChange={(e) => handleParamChange('b', parseInt(e.target.value), i)}
                    className="w-full dark:bg-dark"
                  />
                  <input
                    type="number"
                    value={params.b[i]}
                    onChange={(e) => handleParamChange('b', parseInt(e.target.value), i)}
                    step={getParameterStep('b')}
                    min={getParameterMin('b')}
                    max={getParameterMax('b')}
                    className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Angle maximum */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Angle maximum (θ × π)
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
              <input
                type="range"
                min={getParameterMin('theta_max') / Math.PI}
                max={getParameterMax('theta_max') / Math.PI}
                step={getParameterStep('theta_max') / Math.PI}
                value={params.theta_max / Math.PI}
                onChange={(e) => handleParamChange('theta_max', parseFloat(e.target.value) * Math.PI)}
                className="w-full dark:bg-dark"
              />
              <div className="flex items-center w-24">
                <input
                  type="number"
                  value={(params.theta_max / Math.PI).toFixed(1)}
                  onChange={(e) => handleParamChange('theta_max', parseFloat(e.target.value) * Math.PI)}
                  step={getParameterStep('theta_max') / Math.PI}
                  min={getParameterMin('theta_max') / Math.PI}
                  max={getParameterMax('theta_max') / Math.PI}
                  className="w-20 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                />
                <span className="ml-1 dark:text-white">π</span>
              </div>
            </div>
          </div>

          {/* Nombre de points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Nombre de points
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-1">
              <input
                type="range"
                min={getParameterMin('points')}
                max={getParameterMax('points')}
                step={getParameterStep('points')}
                value={params.points}
                onChange={(e) => handleParamChange('points', parseInt(e.target.value))}
                className="w-full dark:bg-dark"
              />
              <input
                type="number"
                value={params.points}
                onChange={(e) => handleParamChange('points', parseInt(e.target.value))}
                step={getParameterStep('points')}
                min={getParameterMin('points')}
                max={getParameterMax('points')}
                className="w-24 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
              />
            </div>
          </div>
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

export default ExponentialTab; 