import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-0 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mt-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mt-4 md:mt-8 lg:mt-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                ALGORI: Visualisateur de Courbes Mathématiques
              </h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Fonctionnalités
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Visualisation de courbes en 2D et 3D avec des contrôles interactifs</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Export des courbes au format SVG et PLY pour une utilisation ultérieure</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>Interface intuitive pour ajuster les paramètres en temps réel</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row mt-4 p-4">
              <div className="flex-1 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg available-curves w-full md:w-1/2 lg:w-1/2 xl:w-1/2" style={{ marginBottom: '20px' }}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Courbes Disponibles</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Courbe de Clélie 3D</li>
                  <li>• Courbe de Lissajous 2D et 3D</li>
                  <li>• Trajectoire Exponentielle</li>
                  <li>• Hypertrochoïde</li>
                </ul>
              </div>
              <div className="flex-1 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg how-to-start w-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:ml-4 lg:ml-4 xl:ml-4" style={{ marginBottom: '20px' }}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comment Commencer</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Choisissez une courbe dans le menu</li>
                  <li>Ajustez les paramètres avec les curseurs</li>
                  <li>Visualisez la courbe en temps réel</li>
                  <li>Exportez la courbe si vous le souhaitez</li>
                </ul>
              </div>
            </div>

            <div 
              role="navigation" 
              aria-label="Navigation principale"
              className="flex justify-center space-x-4"
            >
              <Link 
                to="/curves" 
                aria-label="Explorer les différentes courbes mathématiques"
                className="inline-flex items-center px-2 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Explorer les Courbes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
