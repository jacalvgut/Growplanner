import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Bed3: React.FC = () => {
  return (
    <button
      className="zone bed bed-vertical bed-3"
      onClick={() => handleElementClick('Bancal 3')}
    >
      Bancal 3
    </button>
  );
};


