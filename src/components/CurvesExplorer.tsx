import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import CurveVisualization from './CurveVisualization';

interface ParameterExplanation {
  symbol: string;
  description: string;
}

const CurveCard: React.FC<{
  to: string;
  title: string;
  formula: string;
  description: string;
  params: ParameterExplanation[];
  examplePoints: [number, number][];
  position?: 'left' | 'right' | 'center';
}> = ({ to, title, formula, description, params, examplePoints, position = 'center' }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Simplification du positionnement
  const getPositionClass = () => {
    if (!isHovered) return '';
    
    switch (position) {
      case 'left':
        return 'left-[20%]';
      case 'right':
        return 'right-[20%]';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div className="relative" // Conteneur pour maintenir l'espace
      onMouseEnter={() => {
        setIsHovered(true);
        setIsAnyCardHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsAnyCardHovered(false);
      }}
    >
      <Link 
        to={to}
        className={`block bg-white dark:bg-dark border dark:border-white p-6 rounded-lg shadow-lg 
          transition-all duration-300 ease-in-out
          ${isHovered 
            ? 'absolute z-50 shadow-2xl dark:bg-dark-secondary scale-125 origin-center'
            : 'hover:scale-105'
          }`}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
          
          <div className="mb-3 overflow-x-auto">
            <BlockMath>{formula}</BlockMath>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {isHovered && (
            <>
              <div className="mt-4 bg-gray-100 dark:bg-dark-secondary p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Paramètres :</h3>
                <ul className="space-y-2">
                  {params.map((param, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{param.symbol}</span> : {param.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="aspect-square w-full bg-white dark:bg-dark-secondary rounded-lg p-4">
                <CurveVisualization 
                  points={examplePoints}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </>
          )}
        </div>
      </Link>
      {isHovered && <div className="h-full w-full invisible" />} {/* Maintient l'espace */}
    </div>
  );
};

const CurvesExplorer: React.FC = () => {
  // Modifions la classe des cartes
  const cardClassName = `bg-white dark:bg-dark border dark:border-white p-6 rounded-lg shadow-lg 
    hover:z-10 dark:hover:bg-dark-secondary
    transform transition-all duration-300 ease-in-out group
    hover:scale-[1.05] hover:shadow-xl relative`;

  const parameterClassName = "hidden group-hover:block mt-4 bg-gray-100 dark:bg-dark-secondary p-4 rounded-lg transition-all duration-300";

  const lissajous2DParams: ParameterExplanation[] = [
    { symbol: "A", description: "Amplitude de l'oscillation horizontale" },
    { symbol: "B", description: "Amplitude de l'oscillation verticale" },
    { symbol: "p", description: "Fréquence horizontale" },
    { symbol: "q", description: "Fréquence verticale" },
    { symbol: "δ", description: "Déphasage (en π radians)" }
  ];

  const lissajous3DParams: ParameterExplanation[] = [
    { symbol: "A,B,C", description: "Amplitudes selon les axes x, y et z" },
    { symbol: "p,q,r", description: "Fréquences selon les axes x, y et z" },
    { symbol: "δ,φ", description: "Déphasages en x et z (en π radians)" }
  ];

  const clelie3DParams: ParameterExplanation[] = [
    { symbol: "a", description: "Rayon de la sphère de base" },
    { symbol: "m", description: "Nombre de boucles" },
    { symbol: "θ", description: "Angle de parcours" }
  ];

  const exponentialParams: ParameterExplanation[] = [
    { symbol: "n", description: "Nombre de termes dans la somme" },
    { symbol: "aᵢ", description: "Amplitudes des termes" },
    { symbol: "bᵢ", description: "Fréquences des termes" }
  ];

  const hypertrochoideParams: ParameterExplanation[] = [
    { symbol: "R", description: "Rayon du cercle fixe" },
    { symbol: "r", description: "Rayon du cercle mobile" },
    { symbol: "d", description: "Distance au point traceur" }
  ];

  // Points d'exemple pour chaque courbe
  const lissajous2DExample = Array.from({ length: 1000 }, (_, i) => {
    const t = (i / 1000) * 2 * Math.PI;
    return [
      Math.sin(3 * t + 0.5 * Math.PI),
      Math.sin(2 * t)
    ] as [number, number];
  });

  const exponentialExample = Array.from({ length: 1000 }, (_, i) => {
    const theta = (i / 1000) * 2 * Math.PI;
    const x = Math.cos(theta) + 0.5 * Math.cos(2 * theta);
    const y = Math.sin(theta) + 0.5 * Math.sin(2 * theta);
    return [x, y] as [number, number];
  });

  const hypertrochoideExample = Array.from({ length: 1000 }, (_, i) => {
    const t = (i / 1000) * 6 * Math.PI; // 6π pour 3 tours complets
    const R = 5, r = 3, d = 5;
    const x = (R - r) * Math.cos(t) + d * Math.cos((R - r) * t / r);
    const y = (R - r) * Math.sin(t) - d * Math.sin((R - r) * t / r);
    return [x/10, y/10] as [number, number];
  });

  // Modifions les exemples 3D pour une meilleure projection isométrique
  const clelie3DExample = Array.from({ length: 1000 }, (_, i) => {
    const theta = (i / 1000) * 2 * Math.PI;
    const a = 1, m = 2;
    
    // Calcul des coordonnées 3D
    const x = a * Math.cos(m * theta) * Math.sin(theta);
    const y = a * Math.sin(m * theta) * Math.sin(theta);
    const z = a * Math.cos(theta);
    
    // Projection isométrique
    const isoX = (x - y) * Math.cos(Math.PI / 6);
    const isoY = (x + y) * Math.sin(Math.PI / 6) + z;
    
    return [isoX, isoY] as [number, number];
  });

  const lissajous3DExample = Array.from({ length: 1000 }, (_, i) => {
    const t = (i / 1000) * 2 * Math.PI;
    
    // Paramètres pour une forme plus intéressante
    const A = 1, B = 1, C = 1;
    const p = 3, q = 2, r = 4;
    const delta = Math.PI / 2, phi = Math.PI / 4;
    
    // Calcul des coordonnées 3D
    const x = A * Math.sin(p * t + delta);
    const y = B * Math.sin(q * t);
    const z = C * Math.sin(r * t + phi);
    
    // Projection isométrique
    const isoX = (x - y) * Math.cos(Math.PI / 6);
    const isoY = (x + y) * Math.sin(Math.PI / 6) + z;
    
    return [isoX, isoY] as [number, number];
  });

  const [isAnyCardHovered, setIsAnyCardHovered] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-0 dark:bg-dark relative">
      {/* Bouton retour */}
      <div className="mb-6 flex items-center">
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-white dark:hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Explorer les Courbes
      </h1>

      {/* Centrage des cartes */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          <CurveCard
            to="/lissajous2d"
            title="Lissajous 2D"
            formula={"x = A\\sin(pt + \\delta\\pi) \\\\ y = B\\sin(qt)"}
            description="Explorez les courbes de Lissajous en deux dimensions, créées par la composition de mouvements harmoniques."
            params={lissajous2DParams}
            examplePoints={lissajous2DExample}
            position="center"
          />

          <CurveCard
            to="/lissajous3d"
            title="Lissajous 3D"
            formula={"\\begin{cases} x = A\\sin(pt + \\delta\\pi) \\\\ y = B\\sin(qt) \\\\ z = C\\sin(rt + \\phi\\pi) \\end{cases}"}
            description="Découvrez les courbes de Lissajous en trois dimensions avec une visualisation interactive."
            params={lissajous3DParams}
            examplePoints={lissajous3DExample}
            position="center"
          />

          <CurveCard
            to="/clelie3d"
            title="Clélie 3D"
            formula={"\\begin{cases} x = a\\cos(m\\theta)\\sin(\\theta) \\\\ y = a\\sin(m\\theta)\\sin(\\theta) \\\\ z = a\\cos(\\theta) \\end{cases}"}
            description="Visualisez les courbes de Clélie en trois dimensions et explorez leurs propriétés uniques."
            params={clelie3DParams}
            examplePoints={clelie3DExample}
            position="center"
          />

          <CurveCard
            to="/exponential"
            title="Courbe Exponentielle"
            formula={"\\begin{cases} x = \\sum_{i=1}^n a_i\\cos(b_i\\theta) \\\\ y = \\sum_{i=1}^n a_i\\sin(b_i\\theta) \\end{cases}"}
            description="Étudiez les courbes exponentielles et leurs comportements caractéristiques."
            params={exponentialParams}
            examplePoints={exponentialExample}
            position="center"
          />

          <CurveCard
            to="/hypertrochoide"
            title="Hypertrochoïde"
            formula={"\\begin{cases} x = (R-r)\\cos(t) + d\\cos(\\frac{R-r}{r}t) \\\\ y = (R-r)\\sin(t) - d\\sin(\\frac{R-r}{r}t) \\end{cases}"}
            description="Découvrez les motifs fascinants créés par les courbes hypertrochoïdes."
            params={hypertrochoideParams}
            examplePoints={hypertrochoideExample}
            position="center"
          />
        </div>
      </div>

      {/* Overlay qui apparaît quand une carte est survolée */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-500 
          ${isAnyCardHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
    </div>
  );
};

export default CurvesExplorer;
