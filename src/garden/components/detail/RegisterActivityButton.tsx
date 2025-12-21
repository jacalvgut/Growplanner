/**
 * Botón para registrar actividades
 * Inicia el flujo de registro de actividades
 */
import React from 'react';

interface RegisterActivityButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Botón para registrar actividades
 */
export const RegisterActivityButton: React.FC<RegisterActivityButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="register-activity-button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Registrar actividad"
    >
      📝 Registrar actividad
    </button>
  );
};

