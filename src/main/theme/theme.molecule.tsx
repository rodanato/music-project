// EXTERNAL
import React from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import classNames from 'classnames';
import { v4 as uuidv4 } from "uuid";
import { useMachine } from '@xstate/react';

// DEPENDENCIES
import { ThemeState } from './theme.state';
import CardAtom from '../../shared/card/card.atom';
import ThemePaletteAtom from './theme-palette/theme-palette.atom';

// STYLES
import { theme, themeOptions, palettesList } from './theme.styles';

function ThemeMolecule() {
  const [state, send] = useMachine(ThemeState);

  const ThemeOptionsClasses = classNames({
    'mpp-open-menu-animation': true,
    'is-open': state.matches("opened")
  });

  return (
    <div css={[theme]}>
      <i className="material-icons" onClick={() => send("TOGGLE")}>brush</i>
      
      <div css={[themeOptions]} className={ThemeOptionsClasses}>
        <CardAtom>
          <ul css={[palettesList]}>
            {state.context.themes.map((theme: string) => 
              <ThemePaletteAtom
                key={uuidv4()}
                name={theme}
              ></ThemePaletteAtom>
            )}
          </ul>
        </CardAtom>
      </div>
    </div>
  );
}

export default ThemeMolecule;
