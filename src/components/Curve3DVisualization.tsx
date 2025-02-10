import React, { useMemo, useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';
import { Curve3DParams } from '../types/curves';

interface Curve3DVisualizationProps {
  params: any;
  onCameraChange?: (matrix: THREE.Matrix4) => void;
  getPoints?: () => THREE.Vector3[];
  onPointsUpdate?: (points: THREE.Vector3[]) => void;
  style?: React.CSSProperties;
  className?: string;
  ref?: React.RefObject<{ captureImage: () => string }>;
  strokeColor?: string;
  backgroundColor?: string;
}

/**
 * @desc Affiche la courbe 3D et centre automatiquement la caméra sur la totalité des points.
 */
const Scene = forwardRef<{ captureImage: () => string }, {
  params: any;
  onCameraChange?: (matrix: THREE.Matrix4) => void;
  getPoints?: () => THREE.Vector3[];
  onPointsUpdate?: (points: THREE.Vector3[]) => void;
  controlsOnly?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
}>(({ params, onCameraChange, getPoints, onPointsUpdate, controlsOnly, strokeColor = '#FFFFFF', backgroundColor = '#000000' }, ref) => {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef<any>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // 768px est le breakpoint md de Tailwind
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Génération des points de la courbe
  const points = useMemo(() => {
    if (getPoints) {
      // Si on vous a fourni une fonction custom pour générer les points (ex: Clélie)
      return getPoints();
    }
    // Sinon, courbe 3D standard (ex: Lissajous 3D)
    const { A, B, C, p, q, r, delta, phi, longueur, points: numPoints } = params as Curve3DParams;
    const vertices: THREE.Vector3[] = [];

    for (let i = 0; i <= numPoints; i++) {
      const t = (i / numPoints) * longueur * Math.PI;
      const x = A * Math.sin(p * t + delta * Math.PI);
      const y = B * Math.sin(q * t);
      const z = C * Math.sin(r * t + phi * Math.PI);
      vertices.push(new THREE.Vector3(x, y, z));
    }
    return vertices;
  }, [params, getPoints]);

  // Convertit ces points en BufferGeometry
  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  // Ajustement de la caméra et du contrôleur pour centrer la courbe
  useEffect(() => {
    if (!points.length || !controlsRef.current) return;

    const boundingBox = new THREE.Box3().setFromPoints(points);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    // Ne configurer la position initiale qu'une seule fois
    if (!isInitialized) {
      // Placer la cible des contrôles au centre
      controlsRef.current.target.copy(center);

      // Position initiale de la caméra
      const distance = isMobile ? maxDimension * 2 : maxDimension * 1.5;
      camera.position.set(
        center.x + distance,
        center.y + distance,
        center.z + distance
      );

      camera.updateProjectionMatrix();
      controlsRef.current.update();
      setIsInitialized(true);
    }

    // Toujours mettre à jour les limites de zoom
    controlsRef.current.minDistance = maxDimension * 0.5;
    controlsRef.current.maxDistance = maxDimension * 5;

  }, [params, camera, points, isMobile, isInitialized]);

  // Si l'utilisateur change l'angle de caméra, on peut transmettre la matrice
  const handleCameraChange = () => {
    if (!onCameraChange) return;

    const viewMatrix = new THREE.Matrix4();
    const projMatrix = new THREE.Matrix4();

    camera.updateMatrixWorld();
    viewMatrix.copy(camera.matrixWorldInverse);
    projMatrix.copy(camera.projectionMatrix);

    const finalMatrix = new THREE.Matrix4();
    finalMatrix.multiplyMatrices(projMatrix, viewMatrix);
    onCameraChange(finalMatrix);
  };

  useEffect(() => {
    const handleResize = () => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mettre à jour les points quand ils changent
  useEffect(() => {
    if (onPointsUpdate) {
      onPointsUpdate(points);
    }
  }, [points, onPointsUpdate]);

  // Exposer la fonction via useImperativeHandle
  useImperativeHandle(ref, () => ({
    captureImage: () => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL('image/png', 1.0);
    },
    getCamera: () => camera
  }), [gl, scene, camera]);

  // Réinitialiser isInitialized quand le type de courbe change
  useEffect(() => {
    setIsInitialized(false);
  }, [params.curveType]); // Ajouter curveType aux props si nécessaire

  // Créer une géométrie avec des cylindres entre chaque point
  const curveGeometry = useMemo(() => {
    if (points.length < 2) return null;
    
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];
      
      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      {!controlsOnly && (
        <line geometry={lineGeometry}>
          <lineBasicMaterial color={strokeColor} />
        </line>
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan={!isMobile}
        enableZoom
        enableRotate
        onChange={handleCameraChange}
        makeDefault
        rotateSpeed={1.0}
        zoomSpeed={0.5}
        enableDamping={false}
        minPolarAngle={-Math.PI}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI}
        maxAzimuthAngle={Math.PI}
      />

      {!isMobile && (
        <GizmoHelper 
          alignment="bottom-right" 
          margin={[60, 60]}
          onUpdate={() => controlsRef.current?.update()}
        >
          <GizmoViewport labelColor="black" />
        </GizmoHelper>
      )}

      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </>
  );
});

Scene.displayName = 'Scene';

const Curve3DVisualization = forwardRef<{ captureImage: () => string }, Curve3DVisualizationProps>(({
  params,
  onCameraChange,
  getPoints,
  onPointsUpdate,
  style,
  className,
  strokeColor,
  backgroundColor
}, ref) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <div className={`
        aspect-square 
        order-1 lg:order-2 
        ${isMobile 
          ? 'h-[203.2px] w-[203.2px]' 
          : 'h-[400px] w-[400px]'
        }
        bg-white 
        rounded-lg 
        shadow-lg 
        visualization-container
        ${!isMobile && 'mt-[50px]'}
      `}>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          className={`${className} rounded-lg`}
        >
          <Scene
            ref={ref}
            params={params}
            onCameraChange={onCameraChange}
            getPoints={getPoints}
            onPointsUpdate={onPointsUpdate}
            strokeColor={strokeColor}
            backgroundColor={backgroundColor}
          />
        </Canvas>
      </div>
    </div>
  );
});

Curve3DVisualization.displayName = 'Curve3DVisualization';

export default Curve3DVisualization;
