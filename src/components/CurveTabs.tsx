import React from 'react';
import { Link } from 'react-router-dom';
import { CurveType } from '../types/curves';

const curves: { type: CurveType; title: string; description: string }[] = [
  {
    type: 'lissajous2d',
    title: 'Courbe de Lissajous 2D',
    description: 'Une courbe paramétrique qui décrit le mouvement harmonique complexe.'
  },
  {
    type: 'lissajous3d',
    title: 'Courbe de Lissajous 3D',
    description: 'Extension en trois dimensions de la courbe de Lissajous.'
  },
  {
    type: 'clelie3d',
    title: 'Courbe de Clélie',
    description: 'Une courbe sphérique avec des motifs en forme de boucles.'
  },
  {
    type: 'hypertrochoide',
    title: 'Hypertrochoïde',
    description: 'Une courbe créée par un point fixé sur un cercle roulant autour d\'un autre.'
  },
  {
    type: 'exponential',
    title: 'Courbe Exponentielle',
    description: 'Une courbe basée sur des fonctions exponentielles.'
  }
];

const CurveTabs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Visualisation de Courbes Mathématiques
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Explorez différentes courbes mathématiques en 2D et 3D. Modifiez leurs paramètres et exportez-les dans différents formats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {curves.map(({ type, title, description }) => (
            <Link
              key={type}
              to={`/curves/${type}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 flex flex-col"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-sm text-gray-600 flex-grow">
                {description}
              </p>
              <div className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-700">
                Explorer →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurveTabs;
