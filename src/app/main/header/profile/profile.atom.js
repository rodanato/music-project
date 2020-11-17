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

function ProfileAtom({ imageName }: ProfileProps): Node {
  return (
    <button className="mpp-no-btn">
      <img
        width="50"
        src={`${getPublicUrl()}/images/${imageName}`}
        alt="Profile"
      />
    </button>
  );
}

export default ProfileAtom;
