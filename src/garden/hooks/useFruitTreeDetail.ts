/**
 * Hook para gestionar el detalle de un árbol frutal
 * Carga datos del backend y gestiona el estado
 */
import { useEffect } from 'react';
import { FruitTreeId } from '../types';
import { useFruitTreeDetailStore } from '../store/fruitTreeDetailStore';
import * as apiAdapter from '../adapters/apiAdapter';

/**
 * Hook para gestionar el detalle de un árbol frutal
 */
export function useFruitTreeDetail(treeId: FruitTreeId) {
  const store = useFruitTreeDetailStore();

  // Cargar datos cuando cambia el treeId
  useEffect(() => {
    if (treeId) {
      store.setTreeId(treeId);
      loadFruitTreeDetail(treeId);
    }
  }, [treeId]);

  const loadFruitTreeDetail = async (id: FruitTreeId) => {
    store.setLoading(true);
    store.setError(null);

    try {
      // Usar el endpoint de elementos con el treeId como elementId
      const data = await apiAdapter.getElementDetail(id);
      
      store.setActivities(data.elementActivities || []);
      store.setAlerts(data.alerts || []);
      store.setLastUpdated(data.lastUpdated || new Date().toISOString());
    } catch (error) {
      const err = error instanceof Error 
        ? error 
        : new Error('Error al cargar datos del árbol frutal');
      store.setError(err);
      console.error('Error loading fruit tree detail:', error);
    } finally {
      store.setLoading(false);
    }
  };

  const reload = async () => {
    if (store.treeId) {
      await loadFruitTreeDetail(store.treeId);
    }
  };

  const clearFruitTreeDetail = () => {
    store.clearFruitTreeDetail();
  };

  return {
    treeId: store.treeId,
    activities: store.activities,
    alerts: store.alerts,
    loading: store.loading,
    error: store.error,
    lastUpdated: store.lastUpdated,
    reload,
    clearFruitTreeDetail,
    // Para compatibilidad con ActivityTimeline
    elementActivities: store.activities,
    plantActivities: [],
    elementId: store.treeId,
    plants: [],
    actionPlans: [],
  };
}

