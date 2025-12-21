/**
 * Vista detallada de un elemento del jardín
 * Orquestador que decide qué vista específica mostrar según el tipo de elemento
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GardenElementId } from '../types';
import { getElementById } from '../constants';
import { useElementDetail } from '../hooks/useElementDetail';
import { getElementViewType } from '../utils/elementViewHelper';
import { BedDetailView } from './BedDetailView';
import { CompostDetailView } from './CompostDetailView';
import { CircleDetailView } from './CircleDetailView';
import { GreenhouseDetailView } from './GreenhouseDetailView';

/**
 * Vista detallada de un elemento (orquestador)
 */
export const ElementDetailView: React.FC = () => {
  const { elementId } = useParams<{ elementId: string }>();
  const navigate = useNavigate();

  if (!elementId) {
    navigate('/');
    return null;
  }

  const element = getElementById(elementId as GardenElementId);
  const detailData = useElementDetail(elementId as GardenElementId);

  const handleBack = () => {
    // Limpiar el store al salir
    detailData.clearElementDetail();
    navigate('/');
  };

  // Determinar qué vista mostrar según el tipo de elemento
  const viewType = getElementViewType(element);

  switch (viewType) {
    case 'bed':
      return (
        <BedDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'compost':
      return (
        <CompostDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'circle':
      return (
        <CircleDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    case 'greenhouse':
      return (
        <GreenhouseDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
    default:
      // Por defecto, mostrar vista de bancal
      return (
        <BedDetailView
          element={element}
          detailData={detailData}
          onBack={handleBack}
        />
      );
  }
};

