import React, { useState, useCallback, useRef } from 'react';
import { CurveType, Clelie3DParams } from '../../types/curves';
import Curve3DVisualization from '../Curve3DVisualization';
import { saveSvg, savePly, saveSvg3D } from '../../utils/export';
import { ArrowDown, ArrowLeft, Sun, Moon, Play, Pause } from 'lucide-react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useAnimation } from '../../hooks/useAnimation';

const Clelie3DTab: React.FC<{ curveType: CurveType }> = () => {
  const { theme, toggleTheme } = useTheme();
  const [params, setParams] = useState<Clelie3DParams>({
    a: 1,      // Rayon
    m: 2,      // Nombre de boucles
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

  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const visualizationRef = useRef<{ 
    captureImage: () => string;
    getCamera: () => THREE.Camera;
  }>(null);

  // Fonction corrigée pour générer les points de la courbe de Clélie
  const generatePoints = useCallback(() => {
    const vertices: THREE.Vector3[] = [];
    const { a, m, points: numPoints, longueur } = params;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * longueur;
      
      // Équations paramétriques de la courbe de Clélie (sans déphasage)
      const x = a * Math.cos(m * theta) * Math.sin(theta);
      const y = a * Math.sin(m * theta) * Math.sin(theta);
      const z = a * Math.cos(theta);
      
      vertices.push(new THREE.Vector3(x, y, z));
    }
    
    return vertices;
  }, [params]);

  const handleParamChange = (paramName: keyof Clelie3DParams, value: number) => {
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
    
    const fileName = `Clelie3D_a${params.a}_m${params.m}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.svg`
      .replace(/\./g, 'p');
      
    saveSvg3D(points, viewMatrix, projectionMatrix, fileName);
  };

  const handleExportPLY = () => {
    const fileName = `Clelie3D_a${params.a}_m${params.m}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.ply`
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courbe de Clélie 3D</h2>
        </div>

        <div className="flex flex-row space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#201c1c] dark:hover:bg-[#201c1c] transition-colors"
            aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <InfoButton {...curveInfo.clelie3d} />
          <button
            onClick={handleExportSVG}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center space-x-2"
          >
            <span>Exporter en SVG</span>
            <ArrowDown size={16} />
          </button>
          <button
            onClick={handleExportPLY}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>Exporter en PLY</span>
            <ArrowDown size={16} />
          </button>
          <button
            onClick={toggleAnimation}
            disabled={selectedParams.size === 0}
            className={`p-2 rounded-full transition-colors ${
              selectedParams.size === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
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
                  {getParameterLabel(key)}
                </label>
                {key !== 'points' && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleParam(key as keyof Clelie3DParams)}
                      className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        selectedParams.has(key as keyof Clelie3DParams)
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-200 hover:bg-gray-300 dark:bg-dark-secondary dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Animer
                    </button>
                    {selectedParams.has(key as keyof Clelie3DParams) && (
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
                  min={getParameterMin(key)}
                  max={getParameterMax(key)}
                  step={getParameterStep(key)}
                  value={key === 'longueur' ? value / Math.PI : value}
                  onChange={(e) => handleParamChange(key as keyof Clelie3DParams, parseFloat(e.target.value))}
                  className="w-full dark:bg-dark"
                />
                <div className="flex items-center w-24">
                  <input
                    type="number"
                    value={key === 'longueur' ? (value / Math.PI).toFixed(1) : value}
                    onChange={(e) => handleParamChange(key as keyof Clelie3DParams, parseFloat(e.target.value))}
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
    a: 'Rayon (a)',
    m: 'Nombre de boucles (m)',
    longueur: 'Longueur (θ)',
    points: 'Nombre de points'
  };
  return labels[key] || key;
};

const getParameterMin = (key: string): number => {
  const mins: Record<string, number> = {
    a: 0.1,    // Rayon minimum
    m: 1,      // Nombre minimum de boucles
    longueur: 0.1,
    points: 100
  };
  return mins[key] || 0;
};

const getParameterMax = (key: string): number => {
  const maxs: Record<string, number> = {
    a: 5,      // Rayon maximum augmenté
    m: 20,     // Plus de boucles possibles
    longueur: 2 * Math.PI,
    points: 10000
  };
  return maxs[key] || 100;
};

const getParameterStep = (key: string): number => {
  const steps: Record<string, number> = {
    a: 0.1,
    m: 1,
    longueur: 0.1,
    points: 100
  };
  return steps[key] || 1;
};

export default Clelie3DTab; 