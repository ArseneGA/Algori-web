export interface Curve2DParams {
  A: number;
  B: number;
  p: number;
  q: number;
  delta: number;
  longueur: number;
  points: number;
}

export interface Curve3DParams extends Curve2DParams {
  C: number;
  r: number;
  phi: number;
}

export interface SuperformulaParams {
  m: number;
  a: number;
  b: number;
  n1: number;
  n2: number;
  n3: number;
  longueur: number;
  points: number;
}

export interface SuperFormulaParams {
  a: number;  // Scale factor
  b: number;  // Scale factor
  m: number;  // Rotational symmetry
  n1: number; // Shape coefficient
  n2: number; // Shape coefficient
  n3: number; // Shape coefficient
  points: number;
}

export interface ClelieParams {
  a: number;
  m: number;
  theta_max: number;
  points: number;
}

export interface Clelie3DParams {
  a: number;    // Rayon
  m: number;    // Nombre de boucles
  longueur: number;
  points: number;
}

export interface ExponentialParams {
  a: number[];    // Longueurs des barres
  b: number[];    // Vitesses de rotation
  theta_max: number; // Angle maximum
  points: number;    // Nombre de points pour le tracé
  n: number;        // Nombre de termes
}

export interface HypertrochoideParams {
  R: number;
  r: number;
  d: number;
  longueur: number;
  points: number;
}

export interface MaurerRoseParams {
  n: number;      // Nombre de segments
  d: number;      // Angle en degrés
  k: number;      // Paramètre de forme
  points: number; // Nombre de points pour le tracé
}

export type CurveType = 
  | "lissajous2d" 
  | "lissajous3d" 
  | "clelie3d" 
  | "exponential" 
  | "hypertrochoide"
  | "maurerrose";  // Ajout du nouveau type