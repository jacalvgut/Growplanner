import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed1: React.FC = () => {
  return (
    <button
      className="zone bed bed-vertical bed-1"
      onClick={() => handleElementClick('Bancal 1')}
    >
      Bancal 1
    </button>
  );
};


