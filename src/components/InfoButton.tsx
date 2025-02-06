import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface InfoButtonProps {
  title: string;
  content: {
    description: string;
    equations?: string[];
    cases?: { title: string; description: string }[];
  };
}

const InfoButton: React.FC<InfoButtonProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
        aria-label="Informations"
      >
        <Info size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-secondary rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {content.description}
              </p>

              {content.equations && (
                <div className="my-6 space-y-4">
                  {content.equations.map((eq, index) => (
                    <pre key={index} className="bg-gray-100 dark:bg-dark p-2 rounded">
                      {eq}
                    </pre>
                  ))}
                </div>
              )}

              {content.cases && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Cas particuliers intéressants :
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {content.cases.map((item, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-300">
                        <strong>{item.title}</strong> : {item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoButton; 