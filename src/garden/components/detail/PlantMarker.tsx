/**
 * Marcador de planta en el canvas
 * Permite arrastrar y posicionar la planta (si no está plantada)
 * Muestra menú contextual si está plantada
 */
import React, { useState, useRef, useEffect } from 'react';
import { Plant } from '../../types';
import { PlantContextMenu } from './PlantContextMenu';

interface PlantMarkerProps {
  plant: Plant;
  isSelected: boolean;
  onSelect: () => void;
  onMove?: (plantId: string, position: { x: number; y: number }) => void;
  onPlant: (plantId: string) => void;
  onCosechar: (plantId: string) => void;
  onPodar: (plantId: string) => void;
  onEliminar: (plantId: string) => void;
  selectionMode?: boolean;
  isSelectedForActivity?: boolean;
}

/**
 * Marcador de planta arrastrable o fija
 */
export const PlantMarker: React.FC<PlantMarkerProps> = ({
  plant,
  isSelected,
  onSelect,
  onMove,
  onPlant,
  onCosechar,
  onPodar,
  onEliminar,
  selectionMode = false,
  isSelectedForActivity = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showPlantButton, setShowPlantButton] = useState(false);
  const markerRef = useRef<HTMLDivElement>(null);

  const isPlanted = plant.isPlanted ?? false;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // En modo selección, solo permitir seleccionar plantas plantadas (toggle)
    // NO mostrar menú contextual ni hacer otras acciones
    if (selectionMode && isPlanted) {
      onSelect();
      return;
    }
    
    // Si NO es modo selección y está plantada, mostrar menú contextual
    if (isPlanted && !selectionMode) {
      setShowContextMenu(true);
      onSelect();
      return;
    }

    // Si no está plantada y no es modo selección, permitir arrastrar
    if (!isPlanted && !selectionMode && onMove) {
      setIsDragging(true);
      onSelect();
    }
  };

  const handleMouseUp = () => {
    if (!isPlanted && isDragging) {
      setIsDragging(false);
      // Mostrar botón "Plantar" después de soltar
      setShowPlantButton(true);
    }
  };

  useEffect(() => {
    if (!isDragging || isPlanted || !onMove || selectionMode) return;

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

    const handleMouseUpGlobal = () => {
      setIsDragging(false);
      setShowPlantButton(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUpGlobal);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [isDragging, isPlanted, plant.id, onMove, selectionMode]);

  // El menú contextual maneja su propio cierre, no necesitamos este efecto

  const handlePlant = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlant(plant.id);
    setShowPlantButton(false);
  };

  const handleCosechar = () => {
    setShowContextMenu(false);
    onCosechar(plant.id);
  };

  const handlePodar = () => {
    setShowContextMenu(false);
    onPodar(plant.id);
  };

  const handleEliminar = () => {
    setShowContextMenu(false);
    onEliminar(plant.id);
  };

  return (
    <>
      <div
        ref={markerRef}
        className={`plant-marker ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isPlanted ? 'planted' : 'temporary'} ${isSelectedForActivity ? 'selected-for-activity' : ''}`}
        style={{
          position: 'absolute',
          left: `${plant.position.x}%`,
          top: `${plant.position.y}%`,
          transform: 'translate(-50%, -50%)',
          cursor: selectionMode && isPlanted ? 'pointer' : (isPlanted ? 'pointer' : (onMove ? 'move' : 'default')),
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: isSelectedForActivity
            ? '#ffd700'
            : isPlanted 
            ? (isSelected ? '#2d5a3d' : '#4a7c59')
            : (isSelected ? '#6B9D7E' : '#8BB89E'),
          border: isSelectedForActivity
            ? '4px solid #ff8c00'
            : isPlanted 
            ? '3px solid #1a3d26'
            : '3px dashed #3d6548',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isSelectedForActivity ? '#000' : 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          zIndex: isSelected ? 10 : (isPlanted ? 5 : 1),
          transition: isDragging ? 'none' : 'all 0.2s ease',
          boxShadow: isSelectedForActivity
            ? '0 0 12px rgba(255, 215, 0, 0.8)'
            : isPlanted 
            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
            : '0 1px 4px rgba(0, 0, 0, 0.2)',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        title={`${plant.commonName} - ${plant.variety}${isPlanted ? ' (Plantada)' : ' (Temporal)'}${isSelectedForActivity ? ' - Seleccionada' : ''}`}
      >
        {plant.commonName.charAt(0).toUpperCase()}
      </div>
      
      {/* Botón Plantar (solo para plantas temporales) */}
      {showPlantButton && !isPlanted && (
        <div
          className="plant-button-container"
          style={{
            position: 'absolute',
            left: `${plant.position.x}%`,
            top: `${plant.position.y + 5}%`,
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        >
          <button
            className="plant-button"
            onClick={handlePlant}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🌱 Plantar
          </button>
        </div>
      )}

      {/* Menú contextual (solo para plantas plantadas y NO en modo selección) */}
      {showContextMenu && isPlanted && !selectionMode && (
        <PlantContextMenu
          plant={plant}
          position={plant.position}
          onCosechar={handleCosechar}
          onPodar={handlePodar}
          onEliminar={handleEliminar}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </>
  );
};

