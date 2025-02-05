import React, { useState, useCallback, useRef } from 'react';
import { CurveType, Curve3DParams } from '../../types/curves';
import Curve3DVisualization from '../Curve3DVisualization';
import { saveSvg, savePly, saveSvg3D } from '../../utils/export';
import { ArrowDown, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const Lissajous3DTab: React.FC<{ curveType: CurveType }> = () => {
  const [params, setParams] = useState<Curve3DParams>({
    A: 1,      // Amplitude X
    B: 1,      // Amplitude Y
    C: 1,      // Amplitude Z
    p: 2,      // Fréquence X
    q: 3,      // Fréquence Y
    r: 4,      // Fréquence Z
    delta: 0,  // Déphasage X
    phi: 0,    // Déphasage Z
    longueur: 2,
    points: 1000
  });

  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const visualizationRef = useRef<{ captureImage: () => string, getCamera: () => THREE.Camera }>(null);

  const generatePoints = useCallback(() => {
    const vertices: THREE.Vector3[] = [];
    const { A, B, C, p, q, r, delta, phi, longueur, points: numPoints } = params;

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * longueur * Math.PI;
      const x = A * Math.sin(p * t + delta * Math.PI);
      const y = B * Math.sin(q * t);
      const z = C * Math.sin(r * t + phi * Math.PI);
      vertices.push(new THREE.Vector3(x, y, z));
    }
    return vertices;
  }, [params]);

  const handleParamChange = (paramName: keyof Curve3DParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: paramName === 'longueur' ? value * Math.PI : value
    }));
  };

  const handleExportSVG = () => {
    const points = generatePoints();
    const camera = visualizationRef.current?.getCamera();
    
    if (!camera) {
      console.error('Camera not found');
      return;
    }

    const viewMatrix = camera.matrixWorldInverse;
    const projectionMatrix = camera.projectionMatrix;
    
    const fileName = `Lissajous3D_A${params.A}_B${params.B}_C${params.C}_p${params.p}_q${params.q}_r${params.r}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.svg`
      .replace(/\./g, 'p');
      
    saveSvg3D(points, viewMatrix, projectionMatrix, fileName);
  };

  const handleExportPLY = () => {
    const fileName = `Lissajous3D_A${params.A}_B${params.B}_C${params.C}_p${params.p}_q${params.q}_r${params.r}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.ply`
      .replace(/\./g, 'p');
    
    // Générer les points actuels
    const currentPoints = generatePoints();
    
    // Réduire le nombre de points pour le PLY
    const step = Math.max(1, Math.floor(currentPoints.length / 500));
    const reducedPoints = currentPoints.filter((_, index) => index % step === 0);
    
    // Sauvegarder avec les points réduits
    savePly(reducedPoints, fileName);
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courbe de Lissajous 3D</h2>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={handleExportSVG}
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            <span>Exporter en SVG</span>
            <ArrowDown size={16} />
          </button>
          <button
            onClick={handleExportPLY}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
          >
            <span>Exporter en PLY</span>
            <ArrowDown size={16} />
          </button>
        </div>
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
                  value={key === 'longueur' ? value / Math.PI : value}
                  onChange={(e) => handleParamChange(key as keyof Curve3DParams, parseFloat(e.target.value))}
                  className="w-full dark:bg-dark"
                />
                <div className="flex items-center w-24">
                  <input
                    type="number"
                    value={key === 'longueur' ? (value / Math.PI).toFixed(1) : value}
                    onChange={(e) => handleParamChange(key as keyof Curve3DParams, parseFloat(e.target.value))}
                    step={getParameterStep(key)}
                    min={getParameterMin(key)}
                    max={getParameterMax(key)}
                    className="w-20 px-2 py-1 border rounded-md text-sm dark:bg-dark-secondary dark:text-white dark:border-gray-700"
                  />
                  {key === 'longueur' && <span className="ml-1 dark:text-white">π</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-1 lg:order-2 h-[203.2px] sm:h-[400px] lg:h-[500px] bg-white dark:bg-dark-secondary rounded-lg shadow-lg visualization-container">
          <Curve3DVisualization 
            ref={visualizationRef}
            params={params} 
            getPoints={generatePoints}
            onPointsUpdate={setPoints}
          />
        </div>
      </div>
    </div>
  );
};

const getParameterLabel = (key: string): string => {
  const labels: Record<string, string> = {
    A: 'Amplitude X (A)',
    B: 'Amplitude Y (B)',
    C: 'Amplitude Z (C)',
    p: 'Fréquence X (p)',
    q: 'Fréquence Y (q)',
    r: 'Fréquence Z (r)',
    delta: 'Déphasage X (δ)',
    phi: 'Déphasage Z (φ)',
    longueur: 'Longueur (× π)',
    points: 'Nombre de points'
  };
  return labels[key] || key;
};

const getParameterMin = (key: string): number => {
  const mins: Record<string, number> = {
    A: 0.1,
    B: 0.1,
    C: 0.1,
    p: 1,
    q: 1,
    r: 1,
    delta: 0,
    phi: 0,
    longueur: 0.1,
    points: 100
  };
  return mins[key] || 0;
};

const getParameterMax = (key: string): number => {
  const maxs: Record<string, number> = {
    A: 2,
    B: 2,
    C: 2,
    p: 10,
    q: 10,
    r: 10,
    delta: 2,
    phi: 2,
    longueur: 4,
    points: 10000
  };
  return maxs[key] || 100;
};

const getParameterStep = (key: string): number => {
  const steps: Record<string, number> = {
    A: 0.1,
    B: 0.1,
    C: 0.1,
    p: 1,
    q: 1,
    r: 1,
    delta: 0.1,
    phi: 0.1,
    longueur: 0.1,
    points: 100
  };
  return steps[key] || 1;
};

export default Lissajous3DTab; 