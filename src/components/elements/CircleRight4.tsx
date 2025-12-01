import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleRight4: React.FC = () => {
  return (
    <button
      className="circle zone circle-right circle-right-4"
      onClick={() => handleElementClick('Árbol derecho 4')}
    />
  );
};


