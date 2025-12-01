import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight1: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-1"
      onClick={() => handleElementClick('Árbol derecho 1')}
    />
  );
};


