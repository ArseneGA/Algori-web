import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mt-4 md:mt-8 lg:mt-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            ALGORI: Visualisateur de Courbes Mathématiques
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Explorez et visualisez différentes courbes mathématiques en 2D et 3D.
            Modifiez les paramètres en temps réel et exportez vos créations.
          </p>

          <div className="mt-8">
            <Link 
              to="/curves" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Explorer les Courbes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Courbes 2D</h3>
            <p className="mt-2 text-gray-600">
              Visualisez des courbes de Lissajous et d'autres courbes paramétriques en 2D.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Courbes 3D</h3>
            <p className="mt-2 text-gray-600">
              Explorez des courbes de Lissajous et de Clélie en trois dimensions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Export</h3>
            <p className="mt-2 text-gray-600">
              Exportez vos courbes en SVG ou PLY pour une utilisation ultérieure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 