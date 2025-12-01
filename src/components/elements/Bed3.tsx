import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed3: React.FC = () => {
  return (
    <button
      className="zone bed bed-vertical bed-3"
      onClick={() => handleElementClick(GardenElementId.BED_3, 'Bancal 3')}
    >
      Bancal 3
    </button>
  );
};


