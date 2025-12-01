import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed4: React.FC = () => {
  return (
    <button
      className="zone bed bed-horizontal bed-4"
      onClick={() => handleElementClick(GardenElementId.BED_4, 'Bancal 4')}
    >
      Bancal 4
    </button>
  );
};


