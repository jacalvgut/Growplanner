import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed2: React.FC = () => {
  return (
    <button
      className="zone bed bed-vertical bed-2"
      onClick={() => handleElementClick(GardenElementId.BED_2, 'Bancal 2')}
    >
      Bancal 2
    </button>
  );
};


