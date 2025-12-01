/**
 * Botón de navegación a la vista de frutales
 * Se encuentra a la derecha del layout principal del jardín
 */
import React from 'react';

/**
 * Constantes del botón de frutales
 */
const FRUTALES_BUTTON_TEXT = 'FRUTALES';

/**
 * Componente del botón de frutales
 * TODO: Implementar navegación a la vista de frutales
 */
export const FrutalesButton: React.FC = () => {
  const handleClick = (): void => {
    // TODO: Implementar navegación a la vista de frutales
    console.log('Navegando a la vista de Frutales');
    alert('Navegando a la vista de Frutales (próximamente)');
  };

  return (
    <button 
      className="frutales-button" 
      onClick={handleClick}
      aria-label="Ver vista de frutales"
    >
      <span className="frutales-text">{FRUTALES_BUTTON_TEXT}</span>
    </button>
  );
};

