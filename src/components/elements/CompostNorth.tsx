import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CompostNorth: React.FC = () => {
  return (
    <button
      className="zone compost-main"
      onClick={() => handleElementClick('Compostera norte')}
    >
      Compostera
    </button>
  );
};


