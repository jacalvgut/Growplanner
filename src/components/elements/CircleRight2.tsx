import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight2: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-2"
      onClick={() => handleElementClick('Árbol derecho 2')}
    />
  );
};


