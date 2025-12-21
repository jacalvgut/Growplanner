/**
 * Configuración de rutas de la aplicación
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GardenView } from '../garden/views/GardenView';
import { ElementDetailView } from '../garden/views/ElementDetailView';
import { FrutalesView } from '../garden/views/FrutalesView';
import { FruitTreeDetailView } from '../garden/views/FruitTreeDetailView';

/**
 * Componente de enrutamiento principal
 */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GardenView />} />
        <Route path="/element/:elementId" element={<ElementDetailView />} />
        <Route path="/frutales" element={<FrutalesView />} />
        <Route path="/frutales/:treeId" element={<FruitTreeDetailView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

