import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed4: React.FC = () => {
  return (
    <button
      className="zone bed bed-horizontal bed-4"
      onClick={() => handleElementClick('Bancal 4')}
    >
      Bancal 4
    </button>
  );
};


