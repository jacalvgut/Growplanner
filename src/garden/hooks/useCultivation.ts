/**
 * Hook para gestionar cultivos de un elemento
 */
import React, { useCallback } from 'react';
import { GardenElementId, Plant, CreatePlantData, CreateMultiplePlantsData } from '../types';
import { useElementDetailStore } from '../store/elementDetailStore';
import * as cultivationService from '../services/cultivationService';

/**
 * Hook para gestionar plantas de un elemento
 */
export function useCultivation(elementId: GardenElementId) {
  const store = useElementDetailStore();

  // No necesitamos inicializar aquí, se hace en useElementDetail

  const addPlant = useCallback(
    async (data: CreatePlantData) => {
      try {
        const plant = await cultivationService.createPlant(elementId, data);
        store.addPlant(plant);
        return plant;
      } catch (error) {
        console.error('Error adding plant:', error);
        throw error;
      }
    },
    [elementId, store]
  );

  const addMultiplePlants = useCallback(
    async (data: CreateMultiplePlantsData) => {
      try {
        const plants = await cultivationService.createMultiplePlants(
          elementId,
          data
        );
        plants.forEach((plant) => store.addPlant(plant));
        return plants;
      } catch (error) {
        console.error('Error adding multiple plants:', error);
        throw error;
      }
    },
    [elementId, store]
  );

  const updatePlant = useCallback(
    async (plantId: string, updates: Partial<Plant>) => {
      const plant = await cultivationService.updatePlant(
        elementId,
        plantId,
        updates
      );
      store.updatePlant(plantId, plant);
      return plant;
    },
    [elementId, store]
  );

  const deletePlant = useCallback(
    async (plantId: string) => {
      await cultivationService.deletePlant(elementId, plantId);
      store.deletePlant(plantId);
    },
    [elementId, store]
  );

  const movePlant = useCallback(
    async (plantId: string, position: { x: number; y: number }) => {
      await cultivationService.updatePlant(elementId, plantId, { position });
      store.movePlant(plantId, position);
    },
    [elementId, store]
  );

  return {
    plants: store.plants,
    addPlant,
    addMultiplePlants,
    updatePlant,
    deletePlant,
    movePlant,
  };
}

