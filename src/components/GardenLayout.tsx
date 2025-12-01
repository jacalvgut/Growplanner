/**
 * Componente principal que renderiza el layout del jardín
 * Organiza todos los elementos interactuables del huerto en su posición correspondiente
 */
import React from 'react';
import { GardenElementId } from '../types/garden';
import { getGardenElement } from '../constants/gardenElements';
import { GardenElementButton } from './elements/GardenElementButton';
import { CircleBottomRight } from './elements/CircleBottomRight';
import { FrutalesButton } from './FrutalesButton';

/**
 * Orden de renderizado de los elementos del jardín
 * Este orden determina el z-index visual (los últimos se renderizan encima)
 */
const GARDEN_ELEMENTS_ORDER: GardenElementId[] = [
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

/**
 * Layout principal del jardín
 * Renderiza todos los elementos del huerto y el botón de frutales
 */
export const GardenLayout: React.FC = () => {
  return (
    <div className="garden-container">
      <div className="garden">
        {GARDEN_ELEMENTS_ORDER.map((elementId) => {
          // CircleBottomRight tiene una estructura especial con div wrapper
          if (elementId === GardenElementId.CIRCLE_BOTTOM_RIGHT) {
            return <CircleBottomRight key={elementId} />;
          }
          
          const element = getGardenElement(elementId);
          return <GardenElementButton key={elementId} element={element} />;
        })}
      </div>
      <FrutalesButton />
    </div>
  );
};


