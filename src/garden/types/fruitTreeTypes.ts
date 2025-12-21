/**
 * Tipos relacionados con árboles frutales
 */
import { FruitTreeId } from './ids';

/**
 * Tipo de actividad específica para árboles frutales
 */
export type FruitTreeActivityType = 
  | 'riego'
  | 'poda'
  | 'abono';

/**
 * Actividad registrada para árboles frutales
 */
export interface FruitTreeActivity {
  id: string;
  treeId: FruitTreeId;
  type: FruitTreeActivityType;
  date: string; // ISO date string
  notes?: string;
  createdAt: string;
}

/**
 * Datos para crear una actividad de árbol frutal
 */
export interface CreateFruitTreeActivityData {
  type: FruitTreeActivityType;
  date: string;
  notes?: string;
}

/**
 * Información de un árbol frutal
 */
export interface FruitTree {
  id: FruitTreeId;
  name: string;
  displayName: string;
}

