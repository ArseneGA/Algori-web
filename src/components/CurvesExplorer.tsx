import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CurvesExplorer: React.FC = () => {
  // La classe commune pour toutes les cartes
  const cardClassName = `
    relative bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl
    border border-zinc-800/50 shadow-2xl
    hover:border-zinc-700/50 hover:scale-[1.02] hover:bg-zinc-900/70
    transform transition-all duration-300 ease-out
    group overflow-hidden
  `;

  return (
    <div className="p-2 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-black to-zinc-900 min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-zinc-900/25 to-black -z-10"></div>
      <div className="flex justify-start mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-zinc-400 hover:text-white transition-all duration-300 group opacity-75 hover:opacity-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-[-4px] transition-transform" />
          Retour à l'accueil
        </Link>
      </div>
      <div className="flex flex-col items-center text-center mb-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tight mt-8">
            Explorer les courbes
          </h2>
        </div>
      </div>

      {/* Grille des courbes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* Lissajous 2D */}
        <Link 
          to="/lissajous2d"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Lissajous 2D</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Explorez les courbes de Lissajous en deux dimensions, créées par la composition de mouvements harmoniques.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Lissajous 3D */}
        <Link 
          to="/lissajous3d"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Lissajous 3D</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Découvrez les courbes de Lissajous en trois dimensions avec une visualisation interactive.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Clélie 3D */}
        <Link 
          to="/clelie3d"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Clélie 3D</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Visualisez les courbes de Clélie en trois dimensions et explorez leurs propriétés uniques.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Exponentielle */}
        <Link 
          to="/exponential"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Courbe Exponentielle</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Étudiez les courbes exponentielles et leurs comportements caractéristiques.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Hypertrochoïde */}
        <Link 
          to="/hypertrochoide"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Hypertrochoïde</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Découvrez les motifs fascinants créés par les courbes hypertrochoïdes.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Rose de Maurer */}
        <Link 
          to="/maurerrose"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Rose de Maurer</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Découvrez les motifs fascinants des roses de Maurer, créés par l'interaction entre angles et rotations.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Hypocycloïde */}
        <Link 
          to="/hypocycloide"
          className={cardClassName}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/5 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-xl font-medium text-white mb-4">Hypocycloïde</h2>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
            Explorez les courbes hypocycloïdes et leurs différentes formes selon le rapport des rayons.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </div>
  );
};

export default CurvesExplorer; 