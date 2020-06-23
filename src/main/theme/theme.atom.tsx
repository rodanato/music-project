import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Theme = css`
  align-items: center;
  color: white;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  height: 40px;
  right: 20px;
  width: 40px;
  z-index: 2;

  i {
    font-size: 35px;
  }
`;

function ThemeAtom({onThemeUpdate}: any) {
  return (
    <div css={Theme}>
      <i className="material-icons">brush</i>
      
      <ul>
        <li onClick={() => onThemeUpdate("purple")}>Purple Palette</li>
        <li onClick={() => onThemeUpdate("green")}>Green Palette</li>
        <li>Green Palette</li>
      </ul>
    </div>
  );
}

export default ThemeAtom;
