import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CurvesExplorer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // La classe commune pour toutes les cartes
  const cardClassName = `bg-white dark:bg-dark border dark:border-white p-6 rounded-lg shadow-lg 
    hover:shadow-xl hover:scale-[1.02] dark:hover:bg-dark-secondary
    transform transition-all duration-200 ease-in-out`;

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 bg-gray-0 dark:bg-dark">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 dark:text-white dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Explorer les courbes</h2>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#201c1c] dark:hover:bg-[#201c1c] transition-colors"
          aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

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

        {/* Rose de Maurer */}
        <Link 
          to="/maurerrose"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Rose de Maurer</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Découvrez les motifs fascinants des roses de Maurer, créés par l'interaction entre angles et rotations.
          </p>
        </Link>

        {/* Hypocycloïde */}
        <Link 
          to="/hypocycloide"
          className={cardClassName}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Hypocycloïde</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explorez les courbes hypocycloïdes et leurs différentes formes selon le rapport des rayons.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CurvesExplorer; 