/**
 * Configuración de rutas de la aplicación
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GardenView } from '../garden/views/GardenView';
import { ElementDetailView } from '../garden/views/ElementDetailView';
import { FrutalesView } from '../garden/views/FrutalesView';
import { FruitTreeDetailView } from '../garden/views/FruitTreeDetailView';
import { GardenPickerView } from '../gardens/views/GardenPickerView';
import { GardenEditorView } from '../gardens/views/GardenEditorView';
import { GardenFrutalesView } from '../gardens/views/GardenFrutalesView';

/**
 * Componente de enrutamiento principal
 */
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GardenPickerView />} />
        <Route path="/garden/:gardenId" element={<GardenView />} />
        <Route path="/garden/:gardenId/edit" element={<GardenEditorView />} />
        <Route path="/garden/:gardenId/element/:elementId" element={<ElementDetailView />} />
        <Route path="/garden/:gardenId/frutales" element={<GardenFrutalesView />} />
        <Route path="/frutales" element={<FrutalesView />} />
        <Route path="/frutales/:treeId" element={<FruitTreeDetailView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

