/**
 * Marcador de planta en el canvas
 * Permite arrastrar y posicionar la planta
 */
import React, { useState, useRef, useEffect } from 'react';
import { Plant } from '../../types';

interface PlantMarkerProps {
  plant: Plant;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (plantId: string, position: { x: number; y: number }) => void;
}

/**
 * Marcador de planta arrastrable
 */
export const PlantMarker: React.FC<PlantMarkerProps> = ({
  plant,
  isSelected,
  onSelect,
  onMove,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onSelect();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!markerRef.current) return;

      const canvas = markerRef.current.parentElement;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      onMove(plant.id, { x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, plant.id, onMove]);

  return (
    <div
      ref={markerRef}
      className={`plant-marker ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        left: `${plant.position.x}%`,
        top: `${plant.position.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'move',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        background: isSelected ? '#4a7c59' : '#6B9D7E',
        border: '2px solid #3d6548',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        zIndex: isSelected ? 10 : 1,
        transition: isDragging ? 'none' : 'all 0.2s ease',
      }}
      onMouseDown={handleMouseDown}
      title={`${plant.commonName} - ${plant.variety}`}
    >
      {plant.commonName.charAt(0).toUpperCase()}
    </div>
  );
};

