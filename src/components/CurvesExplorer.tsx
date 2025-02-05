import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CurvesExplorer: React.FC = () => {
  // La classe commune pour toutes les cartes
  const cardClassName = `bg-white dark:bg-dark border dark:border-white p-6 rounded-lg shadow-lg 
    hover:shadow-xl hover:scale-[1.02] dark:hover:bg-dark-secondary
    transform transition-all duration-200 ease-in-out`;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-0 dark:bg-dark">
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

      {/* Grille des courbes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lissajous 2D */}
        <Link 
          to="/lissajous2d"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Lissajous 2D</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explorez les courbes de Lissajous en deux dimensions, créées par la composition de mouvements harmoniques.
          </p>
        </Link>

        {/* Lissajous 3D */}
        <Link 
          to="/lissajous3d"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Lissajous 3D</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Découvrez les courbes de Lissajous en trois dimensions avec une visualisation interactive.
          </p>
        </Link>

        {/* Clélie 3D */}
        <Link 
          to="/clelie3d"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Clélie 3D</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Visualisez les courbes de Clélie en trois dimensions et explorez leurs propriétés uniques.
          </p>
        </Link>

        {/* Exponentielle */}
        <Link 
          to="/exponential"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Courbe Exponentielle</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Étudiez les courbes exponentielles et leurs comportements caractéristiques.
          </p>
        </Link>

        {/* Hypertrochoïde */}
        <Link 
          to="/hypertrochoide"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Hypertrochoïde</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Découvrez les motifs fascinants créés par les courbes hypertrochoïdes.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CurvesExplorer; 