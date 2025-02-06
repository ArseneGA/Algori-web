import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-0 to-gray-0 dark:from-dark dark:to-dark mt-0">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#201c1c] dark:hover:bg-[#201c1c] transition-colors"
          aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mt-4 md:mt-8 lg:mt-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ALGORI: Visualisateur de Courbes Mathématiques
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Explorez et visualisez différentes courbes mathématiques en 2D et 3D.
            Modifiez les paramètres en temps réel et exportez vos créations.
          </p>

          <div className="mt-8">
            <Link 
              to="/curves" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-[#201c1c] dark:hover:bg-gray-800 transition-colors"
            >
              Explorer les Courbes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Courbes 2D</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Visualisez des courbes de Lissajous et d'autres courbes paramétriques en 2D.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Courbes 3D</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Explorez des courbes de Lissajous et de Clélie en trois dimensions.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Exportez vos courbes en SVG ou PLY pour une utilisation ultérieure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
