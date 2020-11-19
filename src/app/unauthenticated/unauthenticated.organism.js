// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react";

// DEPENDENCIES

// STYLES

type UnauthenticatedProps = {
  onLogin: () => mixed,
};

function UnauthenticatedOrganism({ onLogin }: UnauthenticatedProps): Node {
  return (
    <div>
      <h2>You are not loggedIn</h2>
      <button onClick={() => onLogin()}>Login here</button>
    </div>
  );
}

export default UnauthenticatedOrganism;
