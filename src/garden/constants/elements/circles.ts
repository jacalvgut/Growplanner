/**
 * Definición de los elementos círculos (árboles)
 */
import { GardenElement, GardenElementId } from '../../types';

export const circleElements: Record<string, GardenElement> = {
  [GardenElementId.CIRCLE_BOTTOM_LEFT]: {
    id: GardenElementId.CIRCLE_BOTTOM_LEFT,
    type: 'circle',
    name: 'Árbol inferior izquierdo',
    displayName: 'Parra',
    className: 'circle zone circle-bottom-left',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_IN_1]: {
    id: GardenElementId.CIRCLE_IN_1,
    type: 'circle',
    name: 'Pitaya 1',
    displayName: 'Pitaya 1',
    className: 'circle zone circle-in-1',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_IN_2]: {
    id: GardenElementId.CIRCLE_IN_2,
    type: 'circle',
    name: 'Pitaya 2',
    displayName: 'Pitaya 2',
    className: 'circle zone circle-in-2',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_RIGHT_1]: {
    id: GardenElementId.CIRCLE_RIGHT_1,
    type: 'circle',
    name: 'Árbol derecho 1',
    displayName: 'Papayero',
    className: 'circle zone circle-right circle-right-1',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_RIGHT_2]: {
    id: GardenElementId.CIRCLE_RIGHT_2,
    type: 'circle',
    name: 'Árbol derecho 2',
    displayName: 'Platanera 1',
    className: 'circle zone circle-right circle-right-2',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_RIGHT_3]: {
    id: GardenElementId.CIRCLE_RIGHT_3,
    type: 'circle',
    name: 'Árbol derecho 3',
    displayName: 'Platanera 2',
    className: 'circle zone circle-right circle-right-3',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_RIGHT_4]: {
    id: GardenElementId.CIRCLE_RIGHT_4,
    type: 'circle',
    name: 'Árbol derecho 4',
    displayName: 'Platanera 3',
    className: 'circle zone circle-right circle-right-4',
    hasWrapper: false,
  },
  [GardenElementId.CIRCLE_BOTTOM_RIGHT]: {
    id: GardenElementId.CIRCLE_BOTTOM_RIGHT,
    type: 'circle',
    name: 'Árbol derecho inferior',
    displayName: 'Platanera 4',
    className: 'circle zone circle-bottom-right',
    hasWrapper: true, // Este elemento necesita un wrapper div
  },
};

