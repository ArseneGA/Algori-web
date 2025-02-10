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
        className="p-2 rounded-lg bg-zinc-800/50 text-white hover:bg-zinc-800 transition-all duration-300 border border-zinc-800/50 hover:border-zinc-700/50 backdrop-blur-sm"
        aria-label="Informations sur la courbe"
      >
        <Info size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 text-zinc-300">
                <div className="mb-4">
                  <p className="text-lg leading-relaxed">{content.description}</p>
                </div>

                {content.equations && (
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-white mb-4">Équations</h3>
                    {content.equations.map((equation, index) => (
                      <div key={index} className="mb-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 font-mono text-sm">
                        {equation}
                      </div>
                    ))}
                    {content.description_equations && (
                      <p className="mt-4 text-zinc-400">
                        {content.description_equations}
                      </p>
                    )}
                  </div>
                )}

                {content.cases && (
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-white mb-4">Cas particuliers intéressants</h3>
                    <ul className="space-y-2">
                      {content.cases.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-500 flex-shrink-0" />
                          <span className="text-zinc-300">
                            {item}
                          </span>
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