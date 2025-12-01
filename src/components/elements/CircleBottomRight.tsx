import React from 'react';
import { handleElementClick } from '../../interaction/handleElementClick';

export const CircleBottomRight: React.FC = () => {
  return (
    <div className="right-bottom-rect">
      <button
        className="circle zone circle-bottom-right"
        onClick={() => handleElementClick('Árbol derecho inferior')}
      />
    </div>
  );
};


