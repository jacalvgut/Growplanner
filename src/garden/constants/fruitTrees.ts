/**
 * Constantes de los árboles frutales
 */
import { FruitTree, FruitTreeId } from '../types';

/**
 * Registro de todos los árboles frutales
 */
export const FRUIT_TREES: Record<FruitTreeId, FruitTree> = {
  [FruitTreeId.AGUACATERO_HASH]: {
    id: FruitTreeId.AGUACATERO_HASH,
    name: 'Aguacatero Hash',
    displayName: 'Aguacatero Hash',
  },
  [FruitTreeId.AGUACATERO_CUBA]: {
    id: FruitTreeId.AGUACATERO_CUBA,
    name: 'Aguacatero Cuba',
    displayName: 'Aguacatero Cuba',
  },
  [FruitTreeId.NARANJERO_1]: {
    id: FruitTreeId.NARANJERO_1,
    name: 'Naranjero 1',
    displayName: 'Naranjero 1',
  },
  [FruitTreeId.NARANJERO_2]: {
    id: FruitTreeId.NARANJERO_2,
    name: 'Naranjero 2',
    displayName: 'Naranjero 2',
  },
  [FruitTreeId.PERAL]: {
    id: FruitTreeId.PERAL,
    name: 'Peral',
    displayName: 'Peral',
  },
  [FruitTreeId.MANZANERO]: {
    id: FruitTreeId.MANZANERO,
    name: 'Manzanero',
    displayName: 'Manzanero',
  },
  [FruitTreeId.CIRUELERO]: {
    id: FruitTreeId.CIRUELERO,
    name: 'Ciruelero',
    displayName: 'Ciruelero',
  },
  [FruitTreeId.LIMONERO]: {
    id: FruitTreeId.LIMONERO,
    name: 'Limonero',
    displayName: 'Limonero',
  },
  [FruitTreeId.MANDARINO]: {
    id: FruitTreeId.MANDARINO,
    name: 'Mandarino',
    displayName: 'Mandarino',
  },
};

/**
 * Orden de visualización de los árboles frutales
 * 3 filas x 3 columnas (9 árboles + botón añadir)
 */
export const FRUIT_TREES_ORDER: FruitTreeId[] = [
  FruitTreeId.AGUACATERO_HASH,
  FruitTreeId.AGUACATERO_CUBA,
  FruitTreeId.NARANJERO_1,
  FruitTreeId.NARANJERO_2,
  FruitTreeId.PERAL,
  FruitTreeId.MANZANERO,
  FruitTreeId.CIRUELERO,
  FruitTreeId.LIMONERO,
  FruitTreeId.MANDARINO,
];

/**
 * Obtiene un árbol frutal por su ID
 * Incluye árboles personalizados del store
 */
export function getFruitTreeById(id: FruitTreeId): FruitTree | null {
  // Primero buscar en árboles base
  if (FRUIT_TREES[id]) {
    return FRUIT_TREES[id];
  }
  
  // Si no se encuentra, podría ser un árbol personalizado
  // El store se manejará en el componente que lo usa
  return null;
}

/**
 * Obtiene todos los árboles frutales en orden
 */
export function getFruitTreesInOrder(): FruitTree[] {
  return FRUIT_TREES_ORDER.map((id) => FRUIT_TREES[id]);
}

