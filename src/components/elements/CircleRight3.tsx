import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight3: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-3"
      onClick={() => handleElementClick('Árbol derecho 3')}
    />
  );
};


