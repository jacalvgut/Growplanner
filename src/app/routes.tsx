/**
 * Configuración de rutas de la aplicación
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GardenView } from '../garden/views/GardenView';
import { ElementDetailView } from '../garden/views/ElementDetailView';

/**
 * Componente de enrutamiento principal
 */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GardenView />} />
        <Route path="/element/:elementId" element={<ElementDetailView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

