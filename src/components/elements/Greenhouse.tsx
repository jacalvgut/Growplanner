import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const Greenhouse: React.FC = () => {
  return (
    <button
      className="zone greenhouse"
      onClick={() => handleElementClick('Invernadero')}
    >
      Invernadero
    </button>
  );
};


