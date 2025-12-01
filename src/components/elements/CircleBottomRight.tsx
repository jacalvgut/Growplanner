import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleBottomRight: React.FC = () => {
  return (
    <div className="right-bottom-rect">
      <button
        className="circle zone circle-bottom-right"
        onClick={() => handleElementClick(GardenElementId.CIRCLE_BOTTOM_RIGHT, 'Árbol derecho inferior')}
      >
        Platanera 4
      </button>
    </div>
  );
};


