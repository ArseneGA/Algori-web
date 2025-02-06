interface CurveInfo {
  title: string;
  content: {
    description: string;
    equations: string[];
    cases: string[];
    description_equations?: string;
  };
}

export const curveInfo: Record<string, CurveInfo> = {
  lissajous2d: {
    title: "Courbe de Lissajous 2D",
    content: {
      description: "Les courbes de Lissajous en deux dimensions sont définies par des fonctions sinusoïdales en fonction du temps.",
      equations: [
        "x = A sin(pt + δπ)",
        "y = B sin(qt)"
      ],
      description_equations: "où A et B sont les amplitudes, p et q sont les fréquences et δ est un déphasage.",
      cases: [
        "Lorsque p/q est un rapport rationnel, la courbe est fermée.",
        "Pour p/q = 1, on obtient une ellipse.",
        "Si p/q est irrationnel, la courbe ne se referme jamais et remplit progressivement une surface.",
        "Pour δ = 0 ou δ = 1, la courbe devient symétrique par rapport à l'axe des abscisses ou des ordonnées."
      ]
    }
  },
  lissajous3d: {
    title: "Courbe de Lissajous 3D",
    content: {
      description: "En trois dimensions, la courbe de Lissajous est une extension naturelle de la version 2D.",
      equations: [
        "x = A sin(pt + δπ)",
        "y = B sin(qt)",
        "z = C sin(rt + φπ)",
        "où A, B, C sont les amplitudes, p, q, r sont les fréquences et δ, φ sont les déphasages."
      ],
      cases: [
        "Lorsque les rapports p/q et q/r sont rationnels, la courbe est fermée et forme un nœud harmonieux dans l'espace.",
        "Si p, q, r sont des multiples entiers, la courbe est périodique et produit des formes nodales complexes.",
        "Un choix judicieux de δ et φ peut donner des figures symétriques ou asymétriques, créant des effets visuels variés."
      ]
    }
  },
  clelie3d: {
    title: "Courbe de Clélie",
    content: {
      description: "La courbe de Clélie est une courbe tracée sur une sphère.",
      equations: [
        "x = a cos(mθ) sin(θ)",
        "y = a sin(mθ) sin(θ)",
        "z = a cos(θ)",
        "où a est le rayon et m contrôle la complexité des boucles sur une sphère."
      ],
      cases: [
        "Si m = 1, on obtient un cercle de latitude.",
        "Pour m grand, la courbe remplit progressivement la sphère.",
        "Lorsque θ varie de 0 à π, la courbe ne couvre que la moitié de la sphère."
      ]
    }
  },
  exponential: {
    title: "Courbe exponentielle",
    content: {
      description: "La courbe exponentielle est décrite par une somme de sinusoïdes.",
      equations: [
        "x = Σ(i=1 à n) ai cos(biθ)",
        "y = Σ(i=1 à n) ai sin(biθ)",
        "où n est le nombre de termes et ai, bi déterminent la fréquence et l'amplitude de chaque composante."
      ],
      cases: [
        "Pour n = 1, la courbe est un cercle.",
        "Avec des coefficients bien choisis, on obtient des motifs en spirale ou quasi-périodiques."
      ]
    }
  },
  hypertrochoide: {
    title: "Hypertrochoïde",
    content: {
      description: "La courbe hypertrochoïdale est une généralisation de l'hypotrochoïde.",
      equations: [
        "x = (R - r) cos(t) + d cos((R - r)t/r)",
        "y = (R - r) sin(t) - d sin((R - r)t/r)",
        "où R et r sont les rayons et d est la distance du point traceur."
      ],
      cases: [
        "Si d = r, la courbe devient une hypocycloïde.",
        "Pour R = 2r, la courbe est un astéroïde (étoile à quatre branches).",
        "Si d > r, la courbe s'éloigne plus des formes classiques."
      ]
    }
  },
  maurerrose: {
    title: "Rose de Maurer",
    content: {
      description: "La rose de Maurer est une extension des roses polaires.",
      equations: [
        "θn = n · d",
        "x = sin(kθn) cos(θn)",
        "y = sin(kθn) sin(θn)",
        "où k contrôle la symétrie et d est l'angle d'incrémentation."
      ],
      cases: [
        "Si k est un entier, la courbe a une symétrie k.",
        "Pour certains rapports k/d, des structures fractales apparaissent.",
        "Avec d = 1 degré, la courbe trace une étoile fine."
      ]
    }
  },
  hypocycloide: {
    title: "Hypocycloïde",
    content: {
      description: "Une hypocycloïde est le chemin suivi par un point attaché à un cercle roulant à l'intérieur d'un autre cercle.",
      equations: [
        "x = (R - r) cos(t) + r cos((R - r)t/r)",
        "y = (R - r) sin(t) - r sin((R - r)t/r)",
        "où R est le rayon du cercle fixe et r est le rayon du cercle mobile."
      ],
      cases: [
        "Le rapport R/r détermine le nombre de pointes de la courbe.",
        "Pour R/r = 2, on obtient un segment de droite.",
        "Pour R/r = 3, on obtient une courbe à trois pointes (deltoïde).",
        "Pour R/r = 4, on obtient une courbe à quatre pointes (astéroïde)."
      ]
    }
  }
}; 