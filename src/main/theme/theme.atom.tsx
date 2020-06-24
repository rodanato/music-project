import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import classNames from 'classnames';
import { v4 as uuidv4 } from "uuid";

import CardAtom from '../../shared/card.atom';
import { useMachine } from '@xstate/react';
import { themeMachine } from './theme.state';

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
    cursor: pointer;
  }
`;

const ThemeOptions = css`
  bottom: 5px;
  margin: 0;
  position: absolute;
  right: 40px;
  width: 160px;
`;

const paletteItem = css`
  text-transform: capitalize;
`;

function ThemeAtom({onThemeUpdate}: any) {
  const [state, send] = useMachine(themeMachine);

  const ThemeOptionsClasses = classNames({
    'mpp-open-menu-animation': true,
    'is-open': state.matches("opened")
  });

  return (
    <div css={Theme}>
      <i className="material-icons" onClick={() => send("TOGGLE")}>brush</i>
      
      <div css={[ThemeOptions]} className={ThemeOptionsClasses}>
        <CardAtom>
          <ul>
            {state.context.themes.map(theme => 
              <li
                key={uuidv4()}
                css={paletteItem}
                onClick={() => onThemeUpdate(theme)}
              >
                {theme} Palette
              </li>
            )}
          </ul>
        </CardAtom>
      </div>
    </div>
  );
}

export default ThemeAtom;
