/**
 * Definición de los elementos bancales
 */
import { GardenElement, GardenElementId } from '../../types';

export const bedElements: Record<string, GardenElement> = {
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
};

