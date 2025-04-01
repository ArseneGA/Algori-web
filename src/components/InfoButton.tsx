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
  currentParams: Record<string, any>;
}

const InfoButton: React.FC<InfoButtonProps> = ({ title, content, currentParams }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour remplacer les variables dans les équations par leurs valeurs
  const formatEquation = (equation: string): string => {
    if (!currentParams) {
      console.log('Pas de paramètres reçus');
      return equation;
    }
    
    console.log('Paramètres reçus:', currentParams);
    
    let result = equation;
    
    // Remplacer les symboles spéciaux
    result = result.replace(/delta/g, "δ");
    result = result.replace(/phi/g, "φ");
    
    // Cas spécial pour la Rose de Maurer
    if (equation.includes("θn") && currentParams.n && currentParams.d) {
      // On utilise une approche différente pour éviter de remplacer le n dans θn
      if (equation.startsWith("θn =")) {
        // Première ligne: θn = n · d°
        return `θn = ${currentParams.n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} · ${currentParams.d.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}°`;
      } else if (equation.includes("sin(k·θn)")) {
        // Lignes suivantes contenant k·θn
        const kValue = currentParams.k.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        return equation.replace(/k·θn/g, `${kValue}·θn`);
      }
      return equation;
    }
    
    // Cas spécial pour la courbe exponentielle
    if (equation.includes("Σ") && currentParams.a && Array.isArray(currentParams.a)) {
      if (equation.includes("cos")) {
        let terms = [];
        for (let i = 0; i < currentParams.n; i++) {
          const a = currentParams.a[i] || 0;
          const b = currentParams.b[i] || 0;
          const formattedA = a.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          const formattedB = b.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          terms.push(`${formattedA}·cos(${formattedB}·θ)`);
        }
        result = `x = ${terms.join(" + ")}`;
      } else if (equation.includes("sin")) {
        let terms = [];
        for (let i = 0; i < currentParams.n; i++) {
          const a = currentParams.a[i] || 0;
          const b = currentParams.b[i] || 0;
          const formattedA = a.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          const formattedB = b.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
          terms.push(`${formattedA}·sin(${formattedB}·θ)`);
        }
        result = `y = ${terms.join(" + ")}`;
      }
      return result;
    }
    
    // Pour les autres types de courbes, traitement normal
    Object.entries(currentParams).forEach(([key, value]) => {
      // Ne pas remplacer les paramètres longueur et points
      if (key !== 'longueur' && key !== 'points' && typeof value === 'number') {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        
        // Formater la valeur (1 décimale)
        const formattedValue = value.toLocaleString('fr-FR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        });
        
        // Remplacer la variable par sa valeur
        result = result.replace(regex, formattedValue);
      }
    });
    
    return result;
  };

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
                    <div className="space-y-2">
                      {content.equations.map((equation, index) => (
                        // Ne pas traiter la dernière équation qui contient l'explication
                        index < content.equations.length - 1 ? (
                          <div key={index} className="mb-2 p-3 bg-zinc-800/50 rounded-lg border border-zinc-800 font-mono text-sm">
                            {formatEquation(equation)}
                          </div>
                        ) : (
                          <div key={index} className="mt-4 text-zinc-400 text-sm">
                            {equation}
                          </div>
                        )
                      ))}
                    </div>
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