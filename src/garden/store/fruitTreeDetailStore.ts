/**
 * Store para gestionar el estado detallado de un árbol frutal
 * Similar a elementDetailStore pero específico para árboles frutales
 */
import { create } from 'zustand';
import { FruitTreeId } from '../types';
import { ElementActivity } from '../types/activityTypes';
import { Alert } from '../types/planningTypes';

/**
 * Estado del detalle de un árbol frutal
 */
interface FruitTreeDetailState {
  treeId: FruitTreeId | null;
  activities: ElementActivity[];
  alerts: Alert[];
  loading: boolean;
  error: Error | null;
  lastUpdated: string | null;
}

/**
 * Acciones del store
 */
interface FruitTreeDetailActions {
  setTreeId: (treeId: FruitTreeId | null) => void;
  setActivities: (activities: ElementActivity[]) => void;
  addActivity: (activity: ElementActivity) => void;
  deleteActivity: (activityId: string) => void;
  setAlerts: (alerts: Alert[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  setLastUpdated: (date: string) => void;
  clearFruitTreeDetail: () => void;
}

/**
 * Store completo
 */
type FruitTreeDetailStore = FruitTreeDetailState & FruitTreeDetailActions;

/**
 * Estado inicial
 */
const initialState: FruitTreeDetailState = {
  treeId: null,
  activities: [],
  alerts: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

/**
 * Store de detalle de árbol frutal
 */
export const useFruitTreeDetailStore = create<FruitTreeDetailStore>((set) => ({
  ...initialState,

  setTreeId: (treeId) => set({ treeId }),

  setActivities: (activities) => set({ activities }),

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),

  deleteActivity: (activityId) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== activityId),
    })),

  setAlerts: (alerts) => set({ alerts }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setLastUpdated: (date) => set({ lastUpdated: date }),

  clearFruitTreeDetail: () => set(initialState),
}));

