interface CurveInfo {
  title: string;
  content: {
    description: string;
    equations: string[];
    cases: string[];
    description_equations?: string;
    parameters?: {
      name: string;
      description: string;
      range?: {
        min: number;
        max: number;
      };
    }[];
  };
}

export const curveInfo: Record<string, CurveInfo> = {
  lissajous2d: {
    title: "Courbe de Lissajous 2D",
    content: {
      description: "Les courbes de Lissajous en deux dimensions sont définies par des fonctions sinusoïdales en fonction du temps.",
      equations: [
        "x = A·sin(p·t + δ·π)",
        "y = B·sin(q·t)",
        " ",
      ],
      description_equations: "où A et B sont les amplitudes, p et q sont les fréquences et δ est un déphasage.",
      cases: [
        "Lorsque p/q est un rapport rationnel, la courbe est fermée.",
        "Pour p/q = 1, on obtient une ellipse.",
        "Si p/q est irrationnel, la courbe ne se referme jamais et remplit progressivement une surface.",
        "Pour δ = 0 ou δ = 1, la courbe devient symétrique par rapport à l'axe des abscisses ou des ordonnées."
      ],
      parameters: [
        {
          name: "A",
          description: "Amplitude horizontale",
          range: { min: 0, max: 5 }
        },
        {
          name: "B",
          description: "Amplitude verticale",
          range: { min: 0, max: 5 }
        },
        {
          name: "p",
          description: "Fréquence horizontale",
          range: { min: 1, max: 10 }
        },
        {
          name: "q",
          description: "Fréquence verticale",
          range: { min: 1, max: 10 }
        },
        {
          name: "delta",
          description: "Déphasage (en multiples de π)",
          range: { min: 0, max: 2 }
        }
      ]
    }
  },
  lissajous3d: {
    title: "Courbe de Lissajous 3D",
    content: {
      description: "En trois dimensions, la courbe de Lissajous est une extension naturelle de la version 2D.",
      equations: [
        "x = A·sin(p·t + δ·π)",
        "y = B·sin(q·t)",
        "z = C·sin(r·t + φ·π)",
        " ",
      ],
      description_equations: "où A, B, C sont les amplitudes, p, q, r sont les fréquences et δ, φ sont les déphasages.",
      cases: [
        "Lorsque les rapports p/q et q/r sont rationnels, la courbe est fermée et forme un nœud harmonieux dans l'espace.",
        "Si p, q, r sont des multiples entiers, la courbe est périodique et produit des formes nodales complexes.",
        "Un choix judicieux de δ et φ peut donner des figures symétriques ou asymétriques, créant des effets visuels variés."
      ],
      parameters: [
        {
          name: "A",
          description: "Amplitude sur l'axe X",
          range: { min: 0, max: 5 }
        },
        {
          name: "B",
          description: "Amplitude sur l'axe Y",
          range: { min: 0, max: 5 }
        },
        {
          name: "C",
          description: "Amplitude sur l'axe Z",
          range: { min: 0, max: 5 }
        },
        {
          name: "p",
          description: "Fréquence sur l'axe X",
          range: { min: 1, max: 10 }
        },
        {
          name: "q",
          description: "Fréquence sur l'axe Y",
          range: { min: 1, max: 10 }
        },
        {
          name: "r",
          description: "Fréquence sur l'axe Z",
          range: { min: 1, max: 10 }
        },
        {
          name: "delta",
          description: "Déphasage X (en multiples de π)",
          range: { min: 0, max: 2 }
        },
        {
          name: "phi",
          description: "Déphasage Z (en multiples de π)",
          range: { min: 0, max: 2 }
        }
      ]
    }
  },
  clelie3d: {
    title: "Courbe de Clélie",
    content: {
      description: "La courbe de Clélie est une courbe tracée sur une sphère.",
      equations: [
        "x = a·cos(n·θ)·sin(θ)",
        "y = b·sin(n·θ)·sin(θ)",
        "z = a·cos(θ)",
        "où a est le rayon de la sphère, b est la hauteur et n contrôle la complexité des boucles."
      ],
      cases: [
        "Si n = 1, on obtient un cercle de latitude.",
        "Pour n grand, la courbe remplit progressivement la sphère.",
        "Lorsque θ varie de 0 à π, la courbe ne couvre que la moitié de la sphère."
      ],
      parameters: [
        {
          name: "a",
          description: "Rayon de la sphère",
          range: { min: 0.1, max: 5 }
        },
        {
          name: "b",
          description: "Hauteur",
          range: { min: 1, max: 10 }
        },
        {
          name: "n",
          description: "Nombre de boucles",
          range: { min: 1, max: 20 }
        }
      ]
    }
  },
  exponential: {
    title: "Courbe exponentielle",
    content: {
      description: "La courbe exponentielle est décrite par une somme de sinusoïdes.",
      equations: [
        "x = Σ(i=1 à n) ai·cos(bi·θ)",
        "y = Σ(i=1 à n) ai·sin(bi·θ)",
        "où ai sont les amplitudes, bi sont les fréquences et n est le nombre de termes."
      ],
      cases: [
        "Pour n = 1, la courbe est un cercle.",
        "Avec des coefficients bien choisis, on obtient des motifs en spirale ou quasi-périodiques."
      ],
      parameters: [
        {
          name: "a",
          description: "Tableau des amplitudes",
          range: { min: 0, max: 5 }
        },
        {
          name: "b",
          description: "Tableau des fréquences",
          range: { min: 0, max: 10 }
        },
        {
          name: "n",
          description: "Nombre de termes",
          range: { min: 1, max: 10 }
        }
      ]
    }
  },
  hypertrochoide: {
    title: "Hypertrochoïde",
    content: {
      description: "La courbe hypertrochoïdale est une généralisation de l'hypotrochoïde.",
      equations: [
        "x = (R - r)·cos(t) + d·cos((R - r)·t/r)",
        "y = (R - r)·sin(t) - d·sin((R - r)·t/r)",
        "où R est le rayon du cercle fixe, r est le rayon du cercle mobile et d est la distance du point traceur."
      ],
      cases: [
        "Si d = r, la courbe devient une hypocycloïde.",
        "Pour R = 2r, la courbe est un astéroïde (étoile à quatre branches).",
        "Si d > r, la courbe s'éloigne plus des formes classiques."
      ],
      parameters: [
        {
          name: "R",
          description: "Rayon du cercle fixe",
          range: { min: 1, max: 5 }
        },
        {
          name: "r",
          description: "Rayon du cercle mobile",
          range: { min: 0.1, max: 2 }
        },
        {
          name: "d",
          description: "Distance du point traceur",
          range: { min: 0, max: 3 }
        }
      ]
    }
  },
  maurerrose: {
    title: 'Rose de Maurer',
    content: {
      description: 'La Rose de Maurer est une courbe paramétrée en coordonnées polaires. Elle est découverte par Peter Maurer en 1987. Elle est obtenue en reliant par des segments de droite des points placés sur une courbe en forme de rose, selon un motif prédéfini.',
      equations: [
        'r = sin(n·θ)',
        'k·θ → modulo 2π'
      ],
      cases: [
        'n pair: 2n pétales',
        'n impair: n pétales',
        'n et k premiers entre eux: n·k points',
        'PGCD(n, k) = g: n·k/g points'
      ],
      parameters: [
        {
          name: 'n',
          description: 'Nombre de pétales'
        },
        {
          name: 'd',
          description: 'Angle d\'incrément en degrés'
        },
        {
          name: 'k',
          description: 'Facteur de forme'
        }
      ]
    }
  },
  maurerrosebis: {
    title: 'Rose de Maurer BIS',
    content: {
      description: 'La Rose de Maurer BIS est une variante de la Rose polaire définie par r = sin(nθ). Le paramètre d multiplie l\'angle, créant des motifs complexes. Si n est impair, la rose basique a n pétales; si n est pair, elle en a 2n.',
      equations: [
        'r = sin(n·θ)',
        'k = θ·d',
        'x = r·cos(k)',
        'y = r·sin(k)'
      ],
      cases: [
        'n impair: n pétales (dans la forme de base)',
        'n pair: 2n pétales (dans la forme de base)',
        'd > 1: crée des motifs complexes entrelacés'
      ],
      parameters: [
        {
          name: 'n',
          description: 'Nombre de pétales de base',
          range: {
            min: 1,
            max: 36
          }
        },
        {
          name: 'd',
          description: 'Multiplicateur d\'angle (crée des motifs entrelacés)',
          range: {
            min: 1,
            max: 180
          }
        }
      ]
    }
  },
  hypocycloide: {
    title: "Hypocycloïde",
    content: {
      description: "Une hypocycloïde est le chemin suivi par un point attaché à un cercle roulant à l'intérieur d'un autre cercle.",
      equations: [
        "x = (R - r)·cos(t) + r·cos((R - r)·t/r)",
        "y = (R - r)·sin(t) - r·sin((R - r)·t/r)",
        "où R est le rayon du cercle fixe et r est le rayon du cercle mobile."
      ],
      cases: [
        "Le rapport R/r détermine le nombre de pointes de la courbe.",
        "Pour R/r = 2, on obtient un segment de droite.",
        "Pour R/r = 3, on obtient une courbe à trois pointes (deltoïde).",
        "Pour R/r = 4, on obtient une courbe à quatre pointes (astéroïde)."
      ],
      parameters: [
        {
          name: "R",
          description: "Rayon du cercle fixe",
          range: { min: 1, max: 5 }
        },
        {
          name: "r",
          description: "Rayon du cercle mobile",
          range: { min: 0.1, max: 2 }
        }
      ]
    }
  }
}; 