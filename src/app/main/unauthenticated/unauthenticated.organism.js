// @flow
// EXTERNAL
import React from 'react'; // eslint-disable-line

// DEPENDENCIES

// STYLES

type UnauthenticatedProps = {
  onLogin: () => mixed
}

function UnauthenticatedOrganism({ onLogin }: UnauthenticatedProps) {
  
  return (
    <div>
      <h2>You are not loggedIn</h2>
      <button onClick={() => onLogin()}>Login here</button>
    </div>
  );
}

export default UnauthenticatedOrganism;
