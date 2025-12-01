import React from 'react';
import { GardenElementId } from '../../types/garden';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CompostSouth: React.FC = () => {
  return (
    <button
      className="zone compost-small"
      onClick={() => handleElementClick(GardenElementId.COMPOST_SOUTH, 'Compostera sur')}
    >
      Compostera 2
    </button>
  );
};


