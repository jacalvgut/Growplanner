/**
 * Vista detallada de un árbol frutal individual
 * Muestra acciones: riego, poda, abono, registros y avisos
 */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FruitTreeId, FruitTree } from '../types';
import { getFruitTreeById } from '../constants/fruitTrees';
import { useFruitTreesStore } from '../store/fruitTreesStore';
import { useFruitTreeDetail } from '../hooks/useFruitTreeDetail';
import { FruitTreeDetailHeader } from '../components/detail/fruitTree/FruitTreeDetailHeader';
import { FruitTreeActions } from '../components/detail/fruitTree/FruitTreeActions';
import { ActivityTimeline } from '../components/detail/ActivityTimeline';
import { AlertsPanel } from '../components/detail/AlertsPanel';

/**
 * Vista detallada de un árbol frutal
 */
export const FruitTreeDetailView: React.FC = () => {
  const { treeId } = useParams<{ treeId: string }>();
  const navigate = useNavigate();
  const { customTrees } = useFruitTreesStore();

  if (!treeId) {
    navigate('/frutales');
    return null;
  }

  // Buscar en árboles base primero
  let tree = getFruitTreeById(treeId as FruitTreeId);
  
  // Si no se encuentra, buscar en árboles personalizados
  if (!tree) {
    tree = customTrees.find((t) => t.id === treeId) || null;
  }

  if (!tree) {
    navigate('/frutales');
    return null;
  }

  const detailData = useFruitTreeDetail(treeId as FruitTreeId);

  const handleBack = () => {
    detailData.clearFruitTreeDetail();
    navigate('/frutales');
  };

  return (
    <div className="element-detail-page">
      <FruitTreeDetailHeader tree={tree} onBack={handleBack} />
      <div className="element-detail-content">
        <div className="element-detail-main">
          <FruitTreeActions tree={tree} detailData={detailData} />
        </div>
        <div className="element-detail-sidebar">
          <ActivityTimeline detailData={detailData} />
          <AlertsPanel detailData={detailData} />
        </div>
      </div>
    </div>
  );
};

