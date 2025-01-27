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