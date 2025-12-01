import React from 'react';
import { Greenhouse } from './elements/Greenhouse';
import { Bed1 } from './elements/Bed1';
import { Bed2 } from './elements/Bed2';
import { Bed3 } from './elements/Bed3';
import { Bed4 } from './elements/Bed4';
import { Bed5 } from './elements/Bed5';
import { CompostNorth } from './elements/CompostNorth';
import { CompostSouth } from './elements/CompostSouth';
import { CircleBottomLeft } from './elements/CircleBottomLeft';
import { CircleRight1 } from './elements/CircleRight1';
import { CircleRight2 } from './elements/CircleRight2';
import { CircleRight3 } from './elements/CircleRight3';
import { CircleRight4 } from './elements/CircleRight4';
import { CircleBottomRight } from './elements/CircleBottomRight';

export const GardenLayout: React.FC = () => {
  return (
    <div className="garden-container">
      <div className="garden">
        <Greenhouse />
        <Bed1 />
        <Bed2 />
        <Bed3 />
        <Bed4 />
        <Bed5 />

        <CircleBottomLeft />

        <CompostNorth />

        <CircleRight1 />
        <CircleRight2 />
        <CircleRight3 />
        <CircleRight4 />

        <CompostSouth />

        <CircleBottomRight />
      </div>
    </div>
  );
};


