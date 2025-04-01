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
        "y = B·sin(q·t)"
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
    title: "Rose de Maurer",
    content: {
      description: "La rose de Maurer est une extension des roses polaires.",
      equations: [
        "θn = n · d°",
        "x = sin(k·θn)·cos(θn)",
        "y = sin(k·θn)·sin(θn)",
        "où n est le nombre de segments, d est l'angle en degrés et k contrôle la symétrie."
      ],
      cases: [
        "Si k est un entier, la courbe a une symétrie k.",
        "Pour certains rapports k/d, des structures fractales apparaissent.",
        "Avec d = 1 degré, la courbe trace une étoile fine."
      ],
      parameters: [
        {
          name: "n",
          description: "Nombre de segments",
          range: { min: 1, max: 360 }
        },
        {
          name: "d",
          description: "Angle en degrés",
          range: { min: 1, max: 180 }
        },
        {
          name: "k",
          description: "Paramètre de forme",
          range: { min: 1, max: 20 }
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