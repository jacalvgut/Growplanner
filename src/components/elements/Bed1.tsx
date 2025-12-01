import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed1: React.FC = () => {
  return (
    <button
      className="zone bed bed-vertical bed-1"
      onClick={() => handleElementClick(GardenElementId.BED_1, 'Bancal 1')}
    >
      Bancal 1
    </button>
  );
};


