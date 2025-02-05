import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { CurveType, Curve2DParams } from '../../types/curves';
import CurveVisualization from '../CurveVisualization';
import { saveSvg2D } from '../../utils/export';

const Lissajous2DTab: React.FC<{ curveType: CurveType }> = () => {
  const [params, setParams] = useState<Curve2DParams>({
    A: 1,
    B: 1,
    p: 3,
    q: 2,
    delta: 0.5,
    longueur: 2 * Math.PI,
    points: 1000
  });

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

  return (
<<<<<<< HEAD
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 bg-gray-0 dark:bg-dark">
=======
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6">
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div className="space-y-4">
          <div className="flex items-center">
            <Link 
              to="/curves" 
<<<<<<< HEAD
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-white dark:hover:text-gray-300 transition-colors"
=======
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux courbes
            </Link>
          </div>
<<<<<<< HEAD
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courbe de Lissajous 2D</h2>
=======
          <h2 className="text-2xl font-bold text-gray-900">Courbe de Lissajous 2D</h2>
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
        </div>

        <button
          onClick={handleExportSVG}
<<<<<<< HEAD
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
=======
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center justify-center space-x-2"
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
        >
          <span>Exporter en SVG</span>
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
<<<<<<< HEAD
        <div className="order-2 lg:order-1 space-y-4 bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-sm">
          {Object.entries(params).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
=======
        <div className="order-2 lg:order-1 space-y-4 bg-white p-4 rounded-lg shadow-sm">
          {Object.entries(params).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
                {key === 'longueur' ? 'Longueur (× π)' : key}
              </label>
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
<<<<<<< HEAD
                  className="w-full dark:bg-dark"
=======
                  className="w-full"
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
                />
                <div className="flex items-center w-24">
                  <input
                    type="number"
                    value={key === 'longueur' ? (value / Math.PI).toFixed(1) : value}
                    onChange={(e) => handleParamChange(key as keyof Curve2DParams, parseFloat(e.target.value))}
                    step={key === 'points' ? 100 : 0.1}
                    min={key === 'longueur' ? 0.1 : 0}
                    max={key === 'longueur' ? 4 : key === 'points' ? 10000 : 10}
<<<<<<< HEAD
                    className="w-20 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                  />
                  {key === 'longueur' && <span className="ml-1 dark:text-white">π</span>}
=======
                    className="w-20 px-2 py-1 border rounded-md text-sm"
                  />
                  {key === 'longueur' && <span className="ml-1">π</span>}
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 lg:order-2">
<<<<<<< HEAD
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-white dark:bg-dark-secondary rounded-lg shadow-lg visualization-container">
=======
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-white rounded-lg shadow-lg visualization-container">
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
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
