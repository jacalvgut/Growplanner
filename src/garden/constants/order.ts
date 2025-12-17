/**
 * Orden de renderizado de los elementos del jardín
 * Este orden determina el z-index visual (los últimos se renderizan encima)
 */
import { GardenElementId } from '../types';

export const GARDEN_ELEMENTS_ORDER: GardenElementId[] = [
  GardenElementId.GREENHOUSE,
  GardenElementId.BED_1,
  GardenElementId.BED_2,
  GardenElementId.BED_3,
  GardenElementId.BED_4,
  GardenElementId.BED_5,
  GardenElementId.CIRCLE_BOTTOM_LEFT,
  GardenElementId.COMPOST_NORTH,
  GardenElementId.CIRCLE_IN_1,
  GardenElementId.CIRCLE_IN_2,
  GardenElementId.CIRCLE_RIGHT_1,
  GardenElementId.CIRCLE_RIGHT_2,
  GardenElementId.CIRCLE_RIGHT_3,
  GardenElementId.CIRCLE_RIGHT_4,
  GardenElementId.COMPOST_SOUTH,
  GardenElementId.CIRCLE_BOTTOM_RIGHT,
];

