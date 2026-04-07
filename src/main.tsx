/**
 * Punto de entrada de la aplicación
 * Inicializa React y renderiza el componente raíz
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM');
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error al renderizar la aplicación:', error);
  rootElement.innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
      <h1>Error al cargar la aplicación</h1>
      <p>${error instanceof Error ? error.message : 'Error desconocido'}</p>
      <pre style="text-align: left; background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">
        ${error instanceof Error ? error.stack : String(error)}
      </pre>
    </div>
  `;
}
