import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black mt-0">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mt-4 md:mt-8 lg:mt-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            ALGORI: Visualisateur de Courbes Mathématiques
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 font-light">
            Explorez et visualisez différentes courbes mathématiques en 2D et 3D.
            Modifiez les paramètres en temps réel et exportez vos créations.
          </p>

          <div className="mt-8">
            <Link 
              to="/curves" 
              className="inline-flex items-center px-8 py-4 text-base font-medium rounded-lg text-black bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              Explorer les Courbes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-200">
            <h3 className="text-xl font-medium text-white mb-4">Courbes 2D</h3>
            <p className="text-gray-400 leading-relaxed">
              Visualisez des courbes de Lissajous et d'autres courbes paramétriques en 2D.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-200">
            <h3 className="text-xl font-medium text-white mb-4">Courbes 3D</h3>
            <p className="text-gray-400 leading-relaxed">
              Explorez des courbes de Lissajous et de Clélie en trois dimensions.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-200">
            <h3 className="text-xl font-medium text-white mb-4">Export</h3>
            <p className="text-gray-400 leading-relaxed">
              Exportez vos courbes en SVG ou PLY pour une utilisation ultérieure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
