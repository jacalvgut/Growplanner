/**
 * Definición de los elementos composteras
 */
import { GardenElement, GardenElementId } from '../../types';

export const compostElements: Record<string, GardenElement> = {
  [GardenElementId.COMPOST_NORTH]: {
    id: GardenElementId.COMPOST_NORTH,
    type: 'compost',
    name: 'Compostera norte',
    displayName: 'Compostera 1',
    className: 'zone compost-main',
  },
  [GardenElementId.COMPOST_SOUTH]: {
    id: GardenElementId.COMPOST_SOUTH,
    type: 'compost',
    name: 'Compostera sur',
    displayName: 'Compostera 2',
    className: 'zone compost-small',
  },
};

