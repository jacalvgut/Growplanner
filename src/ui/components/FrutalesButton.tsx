/**
 * Botón de navegación a la vista de frutales
 * Se encuentra a la derecha del layout principal del jardín
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Constantes del botón de frutales
 */
const FRUTALES_BUTTON_TEXT = 'FRUTALES';

/**
 * Componente del botón de frutales
 */
export const FrutalesButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/frutales');
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

