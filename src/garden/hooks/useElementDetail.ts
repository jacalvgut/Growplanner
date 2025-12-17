/**
 * Hook para gestionar los detalles de un elemento
 * Combina store y servicios para proporcionar una API completa
 */
import { useEffect, useState, useCallback } from 'react';
import { GardenElementId } from '../types';
import { useElementDetailStore } from '../store/elementDetailStore';
import * as api from '../adapters/apiAdapter';

/**
 * Hook para obtener y gestionar detalles de un elemento
 */
export function useElementDetail(elementId: GardenElementId) {
  const store = useElementDetailStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Cargar datos del elemento
  useEffect(() => {
    if (!elementId) return;

    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getElementDetail(elementId);
        
        // Verificar si el componente fue desmontado
        if (cancelled) return;
        
        // Asegurar que el elementId esté en los datos
        const fullData = {
          ...data,
          elementId: elementId,
        };
        store.loadElementDetail(fullData);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Error desconocido'));
        console.error('Error loading element detail:', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [elementId]); // Solo dependemos de elementId

  const reload = useCallback(async () => {
    if (!elementId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await api.getElementDetail(elementId);
      const fullData = {
        ...data,
        elementId: elementId,
      };
      store.loadElementDetail(fullData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
      console.error('Error loading element detail:', err);
    } finally {
      setLoading(false);
    }
  }, [elementId]);

  return {
    ...store,
    loading,
    error,
    reload,
  };
}

