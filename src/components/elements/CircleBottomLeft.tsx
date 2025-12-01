import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleBottomLeft: React.FC = () => {
  return (
    <button
      className="circle zone circle-bottom-left"
      onClick={() => handleElementClick('Árbol inferior izquierdo')}
    />
  );
};


