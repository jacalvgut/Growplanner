/**
 * Hook para gestionar actividades de composteras
 */
import { useCallback } from 'react';
import { GardenElementId } from '../types';
import { useElementDetailStore } from '../store/elementDetailStore';
import * as compostService from '../services/compostService';
import { CreateCompostActivityData, CompostActivity } from '../types/activityTypes';

/**
 * Hook para gestionar actividades de composteras
 */
export function useCompostActivities(elementId: GardenElementId) {
  const store = useElementDetailStore();

  const addCompostActivity = useCallback(
    async (data: CreateCompostActivityData) => {
      try {
        const activity = await compostService.createCompostActivity(
          elementId,
          data
        );
        // Agregar como actividad de elemento en el store
        const elementActivity = {
          id: activity.id,
          elementId: activity.elementId,
          type: 'otro' as const,
          date: activity.date,
          notes: activity.notes,
          createdAt: activity.createdAt,
        };
        store.addElementActivity(elementActivity);
        return activity;
      } catch (error) {
        console.error('Error adding compost activity:', error);
        throw error;
      }
    },
    [elementId, store]
  );

  const deleteCompostActivity = useCallback(
    async (activityId: string) => {
      await compostService.deleteCompostActivity(elementId, activityId);
      store.deleteElementActivity(activityId);
    },
    [elementId, store]
  );

  return {
    addCompostActivity,
    deleteCompostActivity,
  };
}

