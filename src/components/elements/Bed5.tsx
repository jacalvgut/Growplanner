import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed5: React.FC = () => {
  return (
    <button
      className="zone bed bed-horizontal bed-5"
      onClick={() => handleElementClick('Bancal 5')}
    >
      Bancal 5
    </button>
  );
};


