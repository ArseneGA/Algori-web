import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface InfoButtonProps {
  title: string;
  content: {
    description: string;
    equations: string[];
    description_equations?: string;
    cases: string[];
  };
}

const InfoButton: React.FC<InfoButtonProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-[#201c1c] dark:hover:bg-[#201c1c] transition-colors"
        aria-label="Informations sur la courbe"
      >
        <Info size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-dark rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{content.description}</p>
                </div>

                {content.equations && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Équations</h3>
                    {content.equations.map((equation, index) => (
                      <div key={index} className="mb-2 p-2 bg-gray-50 dark:bg-dark rounded text-gray-700 dark:text-gray-300">
                        {equation}
                      </div>
                    ))}
                    {content.description_equations && (
                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        {content.description_equations}
                      </p>
                    )}
                  </div>
                )}

                {content.cases && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Cas particuliers intéressants</h3>
                    <ul className="list-disc pl-5">
                      {content.cases.map((item, index) => (
                        <li key={index} className="mb-1 text-gray-700 dark:text-gray-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton; 