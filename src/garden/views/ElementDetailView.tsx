/**
 * Vista detallada de un elemento del jardín
 * Muestra información completa, plantas, actividades y avisos
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GardenElementId } from '../types';
import { getElementById } from '../constants';
import { useElementDetail } from '../hooks/useElementDetail';
import { ElementDetailLayout } from '../components/detail/ElementDetailLayout';

/**
 * Vista detallada de un elemento
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

  return (
    <ElementDetailLayout
      element={element}
      detailData={detailData}
      onBack={handleBack}
    />
  );
};

