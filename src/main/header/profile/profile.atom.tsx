// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

// DEPENDENCIES
import { ProfileProps } from './profile.types';

// STYLES


function ProfileAtom({ imageName }: ProfileProps) {
  return (
    <button className="mpp-no-btn">
      <img
        width="50"
        src={`${process.env.PUBLIC_URL}/images/${imageName}`} 
        alt="Profile"
      />
    </button>
  );
}

export default ProfileAtom;