/**
 * Hook para gestionar actividades de árboles frutales
 */
import { useCallback } from 'react';
import { FruitTreeId } from '../types';
import { useFruitTreeDetailStore } from '../store/fruitTreeDetailStore';
import * as fruitTreeService from '../services/fruitTreeService';
import { CreateFruitTreeActivityData, FruitTreeActivity } from '../types/fruitTreeTypes';
import { ElementActivity } from '../types/activityTypes';

/**
 * Hook para gestionar actividades de árboles frutales
 */
export function useFruitTreeActivities(treeId: FruitTreeId) {
  const store = useFruitTreeDetailStore();

  const addFruitTreeActivity = useCallback(
    async (data: CreateFruitTreeActivityData) => {
      try {
        const activity = await fruitTreeService.createFruitTreeActivity(
          treeId,
          data
        );
        // Agregar como actividad de elemento en el store
        let elementActivityType: 'riego' | 'abono' | 'otro' = 'otro';
        switch (activity.type) {
          case 'riego':
            elementActivityType = 'riego';
            break;
          case 'abono':
            elementActivityType = 'abono';
            break;
          case 'poda':
            elementActivityType = 'otro';
            break;
        }
        const elementActivity: ElementActivity = {
          id: activity.id,
          elementId: treeId,
          type: elementActivityType,
          date: activity.date,
          notes: activity.notes,
          createdAt: activity.createdAt,
        };
        store.addActivity(elementActivity);
        return activity;
      } catch (error) {
        console.error('Error adding fruit tree activity:', error);
        throw error;
      }
    },
    [treeId, store]
  );

  const deleteFruitTreeActivity = useCallback(
    async (activityId: string) => {
      await fruitTreeService.deleteFruitTreeActivity(treeId, activityId);
      store.deleteActivity(activityId);
    },
    [treeId, store]
  );

  return {
    addFruitTreeActivity,
    deleteFruitTreeActivity,
  };
}

