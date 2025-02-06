export const curveInfo = {
  lissajous2d: {
    title: "Courbe de Lissajous 2D",
    content: {
      description: "Les courbes de Lissajous en deux dimensions sont définies par des fonctions sinusoïdales en fonction du temps.",
      equations: [
        "x = A \\sin(pt + \\delta\\pi)",
        "y = B \\sin(qt)"
      ],
      cases: [
        {
          title: "p/q rationnel",
          description: "La courbe est fermée"
        },
        {
          title: "p/q = 1",
          description: "On obtient une ellipse"
        },
        {
          title: "p/q irrationnel",
          description: "La courbe ne se referme jamais et remplit progressivement une surface"
        }
      ]
    }
  },
  lissajous3d: {
    title: "Courbe de Lissajous 3D",
    content: {
      description: "En trois dimensions, la courbe de Lissajous est une extension naturelle de la version 2D.",
      equations: [
        "x = A \\sin(pt + \\delta\\pi)",
        "y = B \\sin(qt)",
        "z = C \\sin(rt + \\phi\\pi)"
      ],
      cases: [
        {
          title: "p/q et q/r rationnels",
          description: "La courbe est fermée et forme un nœud harmonieux dans l'espace"
        },
        {
          title: "p, q, r multiples entiers",
          description: "La courbe est périodique et produit des formes nodales complexes"
        }
      ]
    }
  },
  clelie3d: {
    title: "Courbe de Clélie",
    content: {
      description: "La courbe de Clélie est une courbe tracée sur une sphère.",
      equations: [
        "x = a \\cos(m\\theta) \\sin(\\theta)",
        "y = a \\sin(m\\theta) \\sin(\\theta)",
        "z = a \\cos(\\theta)"
      ],
      cases: [
        {
          title: "m = 1",
          description: "On obtient un cercle de latitude"
        },
        {
          title: "m grand",
          description: "La courbe remplit progressivement la sphère"
        }
      ]
    }
  },
  exponential: {
    title: "Courbe Exponentielle",
    content: {
      description: "Décrite par une somme de sinusoïdes.",
      equations: [
        "x = \\sum_{i=1}^n a_i \\cos(b_i\\theta)",
        "y = \\sum_{i=1}^n a_i \\sin(b_i\\theta)"
      ],
      cases: [
        {
          title: "n = 1",
          description: "La courbe est un cercle"
        },
        {
          title: "Coefficients bien choisis",
          description: "On obtient des motifs en spirale ou quasi-périodiques"
        }
      ]
    }
  },
  hypertrochoide: {
    title: "Hypertrochoïde",
    content: {
      description: "La courbe hypertrochoïdale est une généralisation de l'hypotrochoïde.",
      equations: [
        "x = (R - r) \\cos(t) + d \\cos\\left(\\frac{(R - r)t}{r}\\right)",
        "y = (R - r) \\sin(t) - d \\sin\\left(\\frac{(R - r)t}{r}\\right)"
      ],
      cases: [
        {
          title: "d = r",
          description: "La courbe devient une hypocycloïde"
        },
        {
          title: "R = 2r",
          description: "La courbe est un astéroïde (étoile à quatre branches)"
        }
      ]
    }
  },
  maurerrose: {
    title: "Rose de Maurer",
    content: {
      description: "La rose de Maurer est une extension des roses polaires.",
      equations: [
        "\\theta_n = n \\cdot d",
        "x = \\sin(k\\theta_n) \\cos(\\theta_n)",
        "y = \\sin(k\\theta_n) \\sin(\\theta_n)"
      ],
      cases: [
        {
          title: "k entier",
          description: "La courbe a une symétrie k"
        },
        {
          title: "d = 1 degré",
          description: "La courbe trace une étoile fine"
        }
      ]
    }
  },
  hypocycloide: {
    title: "Hypocycloïde",
    content: {
      description: "Une hypocycloïde est le chemin suivi par un point attaché à un cercle roulant à l'intérieur d'un autre cercle.",
      equations: [
        "x = (R - r) \\cos(t) + r \\cos\\left(\\frac{(R - r)t}{r}\\right)",
        "y = (R - r) \\sin(t) - r \\sin\\left(\\frac{(R - r)t}{r}\\right)"
      ],
      cases: [
        {
          title: "k = R/r entier",
          description: "La courbe est fermée avec k cusps"
        },
        {
          title: "k = 2",
          description: "On obtient une droite"
        },
        {
          title: "k = 3",
          description: "On obtient une courbe en forme de trèfle"
        },
        {
          title: "k = 4",
          description: "On obtient une astéroïde"
        }
      ]
    }
  }
}; 