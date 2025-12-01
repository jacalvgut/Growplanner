/**
 * Configuración de Vite para el proyecto
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

/**
 * Puerto del servidor de desarrollo
 */
const DEV_SERVER_PORT = 5173;

export default defineConfig({
  plugins: [react()],
  server: {
    port: DEV_SERVER_PORT,
  },
  resolve: {
    alias: {
      '@garden': path.resolve(__dirname, './src/garden'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@app': path.resolve(__dirname, './src/app'),
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
});


