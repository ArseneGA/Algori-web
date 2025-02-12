import React, { useState, useCallback, useRef } from 'react';
import { CurveType, Clelie3DParams } from '../../types/curves';
import Curve3DVisualization from '../Curve3DVisualization';
import { saveSvg, savePly, saveSvg3D } from '../../utils/export';
import { ArrowDown, ArrowLeft, Play, Pause } from 'lucide-react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import InfoButton from '../InfoButton';
import { curveInfo } from '../../data/curveInfo';
import { useAnimation } from '../../hooks/useAnimation';

const Clelie3DTab: React.FC<{ curveType: CurveType }> = () => {
  const [strokeColor, setStrokeColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [params, setParams] = useState<Clelie3DParams>({
    a: 1,      // Rayon
    b: 2,      // Hauteur
    n: 3,      // Nombre de boucles
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
    const { a, b, n, points: numPoints, longueur } = params;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (i / numPoints) * longueur;
      
      // Équations paramétriques de la courbe de Clélie
      const x = a * Math.cos(n * theta) * Math.sin(theta);
      const y = b * Math.sin(n * theta) * Math.sin(theta);
      const z = a * Math.cos(theta);
      
      vertices.push(new THREE.Vector3(x, y, z));
    }
    
    return vertices;
  }, [params]);

  const handleParamChange = (paramName: keyof Clelie3DParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [paramName]: value
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
    
    const fileName = `Clelie3D_a${params.a}_b${params.b}_n${params.n}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.svg`
      .replace(/\./g, 'p');
      
    saveSvg3D(points, viewMatrix, projectionMatrix, fileName);
  };

  const handleExportPLY = () => {
    const fileName = `Clelie3D_a${params.a}_b${params.b}_n${params.n}_L${(params.longueur/Math.PI).toFixed(1)}pi_pts${params.points}.ply`
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
    <div className="min-h-screen bg-black p-4 sm:p-6">
      {/* Header avec titre et bouton retour */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Courbe de Clélie 3D
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
                  title={curveInfo.clelie3d.title} 
                  content={curveInfo.clelie3d.content} 
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
            <div className="space-y-4">
              {Object.entries(params).map(([key, value]) => (
                <div key={key}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <label className="text-sm font-medium text-white">
                      {getParameterLabel(key)}
                    </label>
                    {key !== 'points' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleParam(key as keyof Clelie3DParams)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                            selectedParams.has(key as keyof Clelie3DParams)
                              ? 'bg-zinc-800 text-white'
                              : 'bg-zinc-800/50 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {selectedParams.has(key as keyof Clelie3DParams) ? 'Animé' : 'Animer'}
                        </button>
                        {selectedParams.has(key as keyof Clelie3DParams) && (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={stepSize}
                              onChange={(e) => setStepSize(Number(e.target.value))}
                              min={0.1}
                              max={10}
                              step={0.1}
                              className="w-16 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-white text-xs text-center focus:outline-none focus:border-zinc-600"
                            />
                            <span className="text-zinc-400 text-xs">pas</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      type="range"
                      min={getParameterMin(key)}
                      max={getParameterMax(key)}
                      step={getParameterStep(key)}
                      value={key === 'longueur' ? value / Math.PI : value}
                      onChange={(e) => handleParamChange(
                        key as keyof Clelie3DParams,
                        key === 'longueur' 
                          ? parseFloat(e.target.value) * Math.PI 
                          : parseFloat(e.target.value)
                      )}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <input
                        type="number"
                        value={key === 'longueur' ? (value / Math.PI).toFixed(1) : value}
                        onChange={(e) => handleParamChange(
                          key as keyof Clelie3DParams,
                          key === 'longueur'
                            ? parseFloat(e.target.value) * Math.PI
                            : parseFloat(e.target.value)
                        )}
                        step={getParameterStep(key)}
                        min={getParameterMin(key)}
                        max={getParameterMax(key)}
                        className="w-20 px-2 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white text-center focus:outline-none focus:border-zinc-600"
                      />
                      {key === 'longueur' && <span className="text-white">π</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Style et Export */}
          <div className="bg-zinc-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-zinc-800/50 shadow-2xl">
            <h3 className="text-xl font-medium text-white mb-6">Style et Export</h3>
            <div className="space-y-6">
              {/* Contrôles de couleur */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Couleur de la courbe
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
                      placeholder="#FFFFFF"
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
              
              {/* Boutons Export */}
              <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleExportSVG}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Exporter en SVG</span>
                  <ArrowDown size={16} />
                </button>
                <button
                  onClick={handleExportPLY}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Exporter en PLY</span>
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualisation */}
        <div className="order-1 lg:order-2">
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-2xl">
            <Curve3DVisualization 
              ref={visualizationRef}
              params={params}
              getPoints={generatePoints}
              onPointsUpdate={setPoints}
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
    a: 'Rayon (a)',
    b: 'Hauteur (b)',
    n: 'Nombre de boucles (n)',
    longueur: 'Longueur (θ)',
    points: 'Nombre de points'
  };
  return labels[key] || key;
};

const getParameterMin = (key: string): number => {
  const mins: Record<string, number> = {
    a: 0.1,    // Rayon minimum
    b: 1,      // Hauteur minimum
    n: 1,      // Nombre minimum de boucles
    longueur: 0.1,
    points: 100
  };
  return mins[key] || 0;
};

const getParameterMax = (key: string): number => {
  const maxs: Record<string, number> = {
    a: 5,      // Rayon maximum augmenté
    b: 10,     // Hauteur maximum
    n: 20,     // Plus de boucles possibles
    longueur: 2 * Math.PI,
    points: 10000
  };
  return maxs[key] || 100;
};

const getParameterStep = (key: string): number => {
  const steps: Record<string, number> = {
    a: 0.1,
    b: 1,
    n: 1,
    longueur: 0.1,
    points: 100
  };
  return steps[key] || 1;
};

export default Clelie3DTab; 