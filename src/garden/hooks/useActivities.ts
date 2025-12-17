/**
 * Hook para gestionar actividades de un elemento
 */
import React, { useCallback } from 'react';
import {
  GardenElementId,
  CreateElementActivityData,
  CreatePlantActivityData,
} from '../types';
import { useElementDetailStore } from '../store/elementDetailStore';
import * as activityService from '../services/activityService';

/**
 * Hook para gestionar actividades
 */
export function useActivities(elementId: GardenElementId) {
  const store = useElementDetailStore();

  // No necesitamos inicializar aquí, se hace en useElementDetail

  const addElementActivity = useCallback(
    async (data: CreateElementActivityData) => {
      try {
        const activity = await activityService.createElementActivity(
          elementId,
          data
        );
        store.addElementActivity(activity);
        return activity;
      } catch (error) {
        console.error('Error adding element activity:', error);
        throw error;
      }
    },
    [elementId, store]
  );

  const deleteElementActivity = useCallback(
    async (activityId: string) => {
      await activityService.deleteElementActivity(elementId, activityId);
      store.deleteElementActivity(activityId);
    },
    [elementId, store]
  );

  const addPlantActivity = useCallback(
    async (plantId: string, data: CreatePlantActivityData) => {
      const activity = await activityService.createPlantActivity(
        elementId,
        plantId,
        data
      );
      store.addPlantActivity(activity);
      return activity;
    },
    [elementId, store]
  );

  const deletePlantActivity = useCallback(
    async (plantId: string, activityId: string) => {
      await activityService.deletePlantActivity(
        elementId,
        plantId,
        activityId
      );
      store.deletePlantActivity(activityId);
    },
    [elementId, store]
  );

  const getRecentActivities = useCallback(
    (limit: number = 10) => {
      return activityService.getRecentActivities(
        store.elementActivities,
        store.plantActivities,
        limit
      );
    },
    [store]
  );

  return {
    elementActivities: store.elementActivities,
    plantActivities: store.plantActivities,
    addElementActivity,
    deleteElementActivity,
    addPlantActivity,
    deletePlantActivity,
    getRecentActivities,
  };
}

