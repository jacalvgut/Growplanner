/**
 * Configuración de Vite para el proyecto
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/**
 * Puerto del servidor de desarrollo
 */
const DEV_SERVER_PORT = 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: DEV_SERVER_PORT,
  },
});


