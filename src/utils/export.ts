import * as THREE from 'three';

export const saveSvg = async (canvas: HTMLCanvasElement, fileName: string) => {
  // Capturer l'état actuel de la visualisation 3D
  const dataURL = canvas.toDataURL('image/png');
  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
      <image width="100%" height="100%" href="${dataURL}"/>
    </svg>`;

  // Utiliser showSaveFilePicker si disponible
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'Fichier SVG',
          accept: {
            'image/svg+xml': ['.svg'],
          },
        }],
      });
      
      const writable = await handle.createWritable();
      await writable.write(new Blob([svgContent], { type: 'image/svg+xml' }));
      await writable.close();
    } catch (err) {
      if (err.name !== 'AbortError') {
        // Fallback vers la méthode classique si erreur
        downloadFallback(svgContent, fileName);
      }
    }
  } else {
    // Fallback pour les navigateurs qui ne supportent pas showSaveFilePicker
    downloadFallback(svgContent, fileName);
  }
};

const downloadFallback = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const savePly = (points: THREE.Vector3[], fileName: string) => {
  // Ajouter le premier point à la fin pour fermer la boucle
  const allPoints = [...points, points[0]];
  const numSegments = allPoints.length - 1;

  const header = [
    'ply',
    'format ascii 1.0',
    `element vertex ${allPoints.length}`,
    'property float x',
    'property float y',
    'property float z',
    `element edge ${numSegments}`,
    'property int vertex1',
    'property int vertex2',
    'end_header'
  ].join('\n');

  // Écrire les vertices
  const vertices = allPoints.map(p => `${p.x} ${p.y} ${p.z}`).join('\n');
  
  // Créer les segments de ligne pour former une boucle continue
  const edges = Array.from({ length: numSegments }, (_, i) => `${i} ${i + 1}`).join('\n');

  const content = `${header}\n${vertices}\n${edges}`;

  // Utiliser showSaveFilePicker si disponible
  if ('showSaveFilePicker' in window) {
    const opts = {
      types: [{
        description: 'PLY File',
        accept: { 'application/x-ply': ['.ply'] }
      }],
      suggestedName: fileName
    };

    window.showSaveFilePicker(opts)
      .then(handle => handle.createWritable())
      .then(writable => {
        writable.write(new Blob([content], { type: 'application/x-ply' }))
          .then(() => writable.close())
          .catch(console.error);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Erreur lors de la sauvegarde:', err);
          downloadFallback(content, fileName);
        }
      });
  } else {
    downloadFallback(content, fileName);
  }
};

// Fonction pour exporter les courbes 2D en véritable SVG
export const saveSvg2D = async (points: [number, number][], fileName: string, width = 800, height = 800) => {
  // Trouver les limites des points pour la mise à l'échelle
  const xValues = points.map(p => p[0]);
  const yValues = points.map(p => p[1]);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Calculer les facteurs d'échelle avec une marge
  const margin = 50;
  const scaleX = (width - 2 * margin) / (maxX - minX);
  const scaleY = (height - 2 * margin) / (maxY - minY);
  const scale = Math.min(scaleX, scaleY);

  // Transformer les points en coordonnées SVG
  const transformedPoints = points.map(([x, y]) => [
    (x - minX) * scale + margin,
    height - ((y - minY) * scale + margin) // Inverser Y car SVG a l'origine en haut
  ]);

  // Créer le chemin SVG
  const pathData = transformedPoints.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return `${path} ${command} ${point[0]},${point[1]}`;
  }, '');

  // Créer le contenu SVG
  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <path
    d="${pathData}"
    fill="none"
    stroke="#4f46e5"
    stroke-width="2"
  />
</svg>`;

  await saveFile(svgContent, fileName, 'image/svg+xml');
};

// Fonction pour exporter les courbes 3D en SVG avec projection
export const saveSvg3D = async (
  points: THREE.Vector3[], 
  viewMatrix: THREE.Matrix4,
  projectionMatrix: THREE.Matrix4,
  fileName: string,
  width = 800,
  height = 800
) => {
  // Créer la matrice de projection complète
  const projViewMatrix = new THREE.Matrix4().multiplyMatrices(projectionMatrix, viewMatrix);
  
  // Projeter les points 3D en 2D
  const projectedPoints = points.map(point => {
    const projected = point.clone().applyMatrix4(projViewMatrix);
    // Convertir en coordonnées NDC (-1 à 1)
    return [
      ((projected.x + 1) * width) / 2,
      ((1 - projected.y) * height) / 2
    ];
  });

  // Créer le chemin SVG
  const pathData = projectedPoints.reduce((path, point, i) => {
    const command = i === 0 ? 'M' : 'L';
    return `${path} ${command} ${point[0]},${point[1]}`;
  }, '');

  // Créer le contenu SVG avec les axes
  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <path
    d="${pathData}"
    fill="none"
    stroke="#4f46e5"
    stroke-width="2"
  />
</svg>`;

  await saveFile(svgContent, fileName, 'image/svg+xml');
};

// Fonction utilitaire pour sauvegarder le fichier
async function saveFile(content: string, fileName: string, type: string) {
  const blob = new Blob([content], { type });

  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'Fichier SVG',
          accept: {
            'image/svg+xml': ['.svg'],
          },
        }],
      });
      
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      if (err.name !== 'AbortError') {
        downloadFallback(content, fileName);
      }
    }
  } else {
    downloadFallback(content, fileName);
  }
} 