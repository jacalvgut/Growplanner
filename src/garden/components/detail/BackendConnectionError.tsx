/**
 * Componente para mostrar error de conexión con el backend
 */
import React from 'react';

interface BackendConnectionErrorProps {
  onRetry?: () => void;
}

/**
 * Mensaje de error cuando el backend no está disponible
 */
export const BackendConnectionError: React.FC<BackendConnectionErrorProps> = ({
  onRetry,
}) => {
  return (
    <div
      className="backend-error"
      style={{
        padding: '2rem',
        background: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px',
        margin: '2rem',
        textAlign: 'center',
      }}
    >
      <h3 style={{ color: '#856404', marginTop: 0 }}>
        ⚠️ Backend no disponible
      </h3>
      <p style={{ color: '#856404', marginBottom: '1rem' }}>
        No se puede conectar con el servidor backend en{' '}
        <strong>http://localhost:8000</strong>
      </p>
      <p style={{ color: '#856404', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Para iniciar el backend, ejecuta:
      </p>
      <div
        style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          fontFamily: 'monospace',
          marginBottom: '1rem',
          textAlign: 'left',
          display: 'inline-block',
        }}
      >
        <div>cd backend</div>
        <div>venv\Scripts\activate</div>
        <div>uvicorn main:app --reload --port 8000</div>
      </div>
      <p style={{ color: '#856404', fontSize: '0.85rem', marginBottom: '1rem' }}>
        O usa el script de inicio:
      </p>
      <div
        style={{
          background: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          fontFamily: 'monospace',
          marginBottom: '1.5rem',
          textAlign: 'left',
          display: 'inline-block',
        }}
      >
        scripts\start-app.bat
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#ffc107',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#856404',
          }}
        >
          Reintentar conexión
        </button>
      )}
    </div>
  );
};

