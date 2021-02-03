// @flow
// EXTERNAL
import React from "react"; // eslint-disable-line
import type { Node } from "react"; // eslint-disable-line
/** @jsx jsx */
// $FlowIgnore
import { jsx, css } from "@emotion/core"; // eslint-disable-line

// DEPENDENCIES
import type { ProfileProps } from "./profile.types";
import { getPublicUrl } from "utils/helpers";

// STYLES

function ProfileAtom({ imageName, onClickAction }: ProfileProps): Node {
  return (
    <button className="mpp-no-btn" onClick={() => onClickAction()}>
      <img
        width="50"
        src={`https://dummyimage.com/50x50/000/ffffff.png&text=X`}
        // src={`${getPublicUrl()}/images/${imageName}`}
        alt="Profile"
      />
    </button>
  );
}

export default ProfileAtom;
