import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CompostSouth: React.FC = () => {
  return (
    <button
      className="zone compost-small"
      onClick={() => handleElementClick('Compostera sur')}
    >
      Compostera
    </button>
  );
};


