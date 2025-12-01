import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed5: React.FC = () => {
  return (
    <button
      className="zone bed bed-horizontal bed-5"
      onClick={() => handleElementClick(GardenElementId.BED_5, 'Bancal 5')}
    >
      Bancal 5
    </button>
  );
};


