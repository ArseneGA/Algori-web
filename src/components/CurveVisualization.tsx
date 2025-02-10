import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CurveVisualizationProps {
  points: [number, number][];
  style?: React.CSSProperties;
  strokeWidth?: number;
  strokeColor?: string;
  backgroundColor?: string;
}

const CurveVisualization: React.FC<CurveVisualizationProps> = ({ points = [], style, strokeWidth = 2, strokeColor = '#FFFFFF', backgroundColor = '#000000' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Obtenir les dimensions du canvas
    const width = canvas.width;
    const height = canvas.height;

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);

    // Appliquer la couleur de fond
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (!points || points.length === 0) return;

    // Trouver les limites des points
    let minX = points[0][0], maxX = points[0][0];
    let minY = points[0][1], maxY = points[0][1];
    
    points.forEach(([x, y]) => {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });

    // Ajouter une marge
    const margin = 20;
    const scaleX = (width - 2 * margin) / (maxX - minX || 1);
    const scaleY = (height - 2 * margin) / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    // Centrer la courbe
    const centerX = (width - scale * (maxX + minX)) / 2;
    const centerY = (height - scale * (maxY + minY)) / 2;

    // Dessiner la courbe
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;

    points.forEach(([x, y], i) => {
      const canvasX = centerX + scale * x;
      const canvasY = centerY + scale * y;
      
      if (i === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    });

    ctx.stroke();
  }, [points, strokeWidth, strokeColor, backgroundColor]);

  return (
    <canvas 
      ref={canvasRef} 
      style={style}
      width={800}
      height={800}
    />
  );
};

export default CurveVisualization;