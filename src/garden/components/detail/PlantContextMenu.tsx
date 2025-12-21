/**
 * Menú contextual para plantas plantadas
 * Muestra opciones: cosechar, podar, eliminar
 */
import React, { useRef, useEffect } from 'react';
import { Plant } from '../../types';

interface PlantContextMenuProps {
  plant: Plant;
  position: { x: number; y: number };
  onCosechar: () => void;
  onPodar: () => void;
  onEliminar: () => void;
  onClose: () => void;
}

/**
 * Menú contextual de planta
 */
export const PlantContextMenu: React.FC<PlantContextMenuProps> = ({
  plant,
  position,
  onCosechar,
  onPodar,
  onEliminar,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Usar mousedown en lugar de click para evitar que se cierre inmediatamente
    // Agregar un pequeño delay para que el click en el botón funcione
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleMenuClick = (e: React.MouseEvent) => {
    // Prevenir que el clic se propague y cierre el menú
    e.stopPropagation();
  };

  return (
    <>
      <div 
        className="context-menu-overlay" 
        onMouseDown={(e) => {
          // Solo cerrar si el clic es directamente en el overlay, no en el menú
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
      <div
        ref={menuRef}
        className="plant-context-menu"
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -100%)',
          marginTop: '-10px',
          zIndex: 1000,
        }}
        onMouseDown={handleMenuClick}
        onClick={handleMenuClick}
      >
        <div className="context-menu-header">
          <span>{plant.commonName} - {plant.variety}</span>
        </div>
        <div className="context-menu-actions">
          <button
            className="context-menu-item cosechar"
            onClick={(e) => {
              e.stopPropagation();
              onCosechar();
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🌾 Cosechar
          </button>
          <button
            className="context-menu-item podar"
            onClick={(e) => {
              e.stopPropagation();
              onPodar();
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ✂️ Podar
          </button>
          <button
            className="context-menu-item eliminar"
            onClick={(e) => {
              e.stopPropagation();
              onEliminar();
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

