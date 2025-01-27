import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CurvesExplorer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <div className="mb-6 flex items-center">
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Explorer les Courbes
      </h1>

      {/* Grille des courbes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lissajous 2D */}
        <Link 
          to="/lissajous2d"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Lissajous 2D</h2>
          <p className="text-gray-600">
            Explorez les courbes de Lissajous en deux dimensions, créées par la composition de mouvements harmoniques.
          </p>
        </Link>

        {/* Lissajous 3D */}
        <Link 
          to="/lissajous3d"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Lissajous 3D</h2>
          <p className="text-gray-600">
            Découvrez les courbes de Lissajous en trois dimensions avec une visualisation interactive.
          </p>
        </Link>

        {/* Clélie 3D */}
        <Link 
          to="/clelie3d"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Clélie 3D</h2>
          <p className="text-gray-600">
            Visualisez les courbes de Clélie en trois dimensions et explorez leurs propriétés uniques.
          </p>
        </Link>

        {/* Exponentielle */}
        <Link 
          to="/exponential"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Courbe Exponentielle</h2>
          <p className="text-gray-600">
            Étudiez les courbes exponentielles et leurs comportements caractéristiques.
          </p>
        </Link>

        {/* Hypertrochoïde */}
        <Link 
          to="/hypertrochoide"
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Hypertrochoïde</h2>
          <p className="text-gray-600">
            Découvrez les motifs fascinants créés par les courbes hypertrochoïdes.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CurvesExplorer; 