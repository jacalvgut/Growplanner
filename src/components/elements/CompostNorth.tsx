import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CompostNorth: React.FC = () => {
  return (
    <button
      className="zone compost-main"
      onClick={() => handleElementClick(GardenElementId.COMPOST_NORTH, 'Compostera norte')}
    >
      Compostera 1
    </button>
  );
};


