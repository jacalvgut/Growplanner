/**
 * Hook para gestionar actividades de círculos (árboles frutales)
 */
import { useCallback } from 'react';
import { GardenElementId } from '../types';
import { useElementDetailStore } from '../store/elementDetailStore';
import * as circleService from '../services/circleService';
import { CreateCircleActivityData, CircleActivity } from '../types/activityTypes';

/**
 * Hook para gestionar actividades de círculos
 */
export function useCircleActivities(elementId: GardenElementId) {
  const store = useElementDetailStore();

  const addCircleActivity = useCallback(
    async (data: CreateCircleActivityData) => {
      try {
        const activity = await circleService.createCircleActivity(
          elementId,
          data
        );
        // Agregar como actividad de elemento en el store
        // Mapear el tipo según corresponda
        let elementActivityType: 'riego' | 'abono' | 'limpieza_hierbas' | 'otro' = 'otro';
        switch (activity.type) {
          case 'regar':
            elementActivityType = 'riego';
            break;
          case 'abonar':
            elementActivityType = 'abono';
            break;
          case 'quitar_hierbas':
            elementActivityType = 'limpieza_hierbas';
            break;
          case 'podar':
            elementActivityType = 'otro';
            break;
        }
        const elementActivity = {
          id: activity.id,
          elementId: activity.elementId,
          type: elementActivityType,
          date: activity.date,
          notes: activity.notes,
          createdAt: activity.createdAt,
        };
        store.addElementActivity(elementActivity);
        return activity;
      } catch (error) {
        console.error('Error adding circle activity:', error);
        throw error;
      }
    },
    [elementId, store]
  );

  const deleteCircleActivity = useCallback(
    async (activityId: string) => {
      await circleService.deleteCircleActivity(elementId, activityId);
      store.deleteElementActivity(activityId);
    },
    [elementId, store]
  );

  return {
    addCircleActivity,
    deleteCircleActivity,
  };
}

