/**
 * Constantes y configuración de los elementos del jardín
 */
import { GardenElement, GardenElementId } from '../types/garden';

/**
 * Configuración de todos los elementos del jardín
 */
export const GARDEN_ELEMENTS: Record<GardenElementId, GardenElement> = {
  [GardenElementId.GREENHOUSE]: {
    id: GardenElementId.GREENHOUSE,
    type: 'greenhouse',
    name: 'Invernadero',
    displayName: 'Invernadero',
    className: 'zone greenhouse',
  },
  [GardenElementId.BED_1]: {
    id: GardenElementId.BED_1,
    type: 'bed',
    name: 'Bancal 1',
    displayName: 'Bancal 1',
    orientation: 'vertical',
    className: 'zone bed bed-vertical bed-1',
  },
  [GardenElementId.BED_2]: {
    id: GardenElementId.BED_2,
    type: 'bed',
    name: 'Bancal 2',
    displayName: 'Bancal 2',
    orientation: 'vertical',
    className: 'zone bed bed-vertical bed-2',
  },
  [GardenElementId.BED_3]: {
    id: GardenElementId.BED_3,
    type: 'bed',
    name: 'Bancal 3',
    displayName: 'Bancal 3',
    orientation: 'vertical',
    className: 'zone bed bed-vertical bed-3',
  },
  [GardenElementId.BED_4]: {
    id: GardenElementId.BED_4,
    type: 'bed',
    name: 'Bancal 4',
    displayName: 'Bancal 4',
    orientation: 'horizontal',
    className: 'zone bed bed-horizontal bed-4',
  },
  [GardenElementId.BED_5]: {
    id: GardenElementId.BED_5,
    type: 'bed',
    name: 'Bancal 5',
    displayName: 'Bancal 5',
    orientation: 'horizontal',
    className: 'zone bed bed-horizontal bed-5',
  },
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
  [GardenElementId.CIRCLE_BOTTOM_LEFT]: {
    id: GardenElementId.CIRCLE_BOTTOM_LEFT,
    type: 'circle',
    name: 'Árbol inferior izquierdo',
    displayName: 'Parra',
    className: 'circle zone circle-bottom-left',
  },
  [GardenElementId.CIRCLE_IN_1]: {
    id: GardenElementId.CIRCLE_IN_1,
    type: 'circle',
    name: 'Pitaya 1',
    displayName: 'Pitaya 1',
    className: 'circle zone circle-in-1',
  },
  [GardenElementId.CIRCLE_IN_2]: {
    id: GardenElementId.CIRCLE_IN_2,
    type: 'circle',
    name: 'Pitaya 2',
    displayName: 'Pitaya 2',
    className: 'circle zone circle-in-2',
  },
  [GardenElementId.CIRCLE_RIGHT_1]: {
    id: GardenElementId.CIRCLE_RIGHT_1,
    type: 'circle',
    name: 'Árbol derecho 1',
    displayName: 'Papayero',
    className: 'circle zone circle-right circle-right-1',
  },
  [GardenElementId.CIRCLE_RIGHT_2]: {
    id: GardenElementId.CIRCLE_RIGHT_2,
    type: 'circle',
    name: 'Árbol derecho 2',
    displayName: 'Platanera 1',
    className: 'circle zone circle-right circle-right-2',
  },
  [GardenElementId.CIRCLE_RIGHT_3]: {
    id: GardenElementId.CIRCLE_RIGHT_3,
    type: 'circle',
    name: 'Árbol derecho 3',
    displayName: 'Platanera 2',
    className: 'circle zone circle-right circle-right-3',
  },
  [GardenElementId.CIRCLE_RIGHT_4]: {
    id: GardenElementId.CIRCLE_RIGHT_4,
    type: 'circle',
    name: 'Árbol derecho 4',
    displayName: 'Platanera 3',
    className: 'circle zone circle-right circle-right-4',
  },
  [GardenElementId.CIRCLE_BOTTOM_RIGHT]: {
    id: GardenElementId.CIRCLE_BOTTOM_RIGHT,
    type: 'circle',
    name: 'Árbol derecho inferior',
    displayName: 'Platanera 4',
    className: 'circle zone circle-bottom-right',
  },
};

/**
 * Obtiene la configuración de un elemento por su ID
 */
export const getGardenElement = (id: GardenElementId): GardenElement => {
  const element = GARDEN_ELEMENTS[id];
  if (!element) {
    throw new Error(`Elemento del jardín no encontrado: ${id}`);
  }
  return element;
};

