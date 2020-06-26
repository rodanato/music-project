import React, { Fragment, useContext } from 'react'; // eslint-disable-line
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";
import { useService } from '@xstate/react';
import { MainStateContext } from '../main.state';

type ThemePaletterProps = {
  key: string;
  name: string;
}

const PaletteItem = css`
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
  width: calc(50% - 10px);

  &:nth-of-type(even) {
    margin-right: 0;
  }
`;

const PaletteTitle = css`
  text-transform: capitalize;
  width: 100%;
`;

const PaletteColors = css`
  display: flex;
  margin-bottom: 5px;
  width: 100%;
`;

const PaletteColor = css`
  flex: 1;
  height: 27px;

  &:nth-of-type(1) {
    background-color: var(--mpp-primary);
  }
  &:nth-of-type(2) {
    background-color: var(--mpp-primary-light);
  }
  &:nth-of-type(3) {
    background-color: var(--mpp-primary-dark);
  }
  &:nth-of-type(4) {
    background-color: var(--mpp-secondary);
  }
  &:nth-of-type(5) {
    background-color: var(--mpp-secondary-dark);
  }
  &:nth-of-type(6) {
    background-color: var(--mpp-on-primary);
  }
  &:nth-of-type(7) {
    background-color: var(--mpp-on-secondary);
  }
`;

function ThemePaletteAtom({ name }: ThemePaletterProps) {
  const mainState = useContext(MainStateContext)
  const [, send] = useService(mainState.children.themePalette)
  const colorList = new Array(7).fill(1);

  return (
    <Fragment>
      <li
        css={PaletteItem}
        onClick={() => send("SELECT", { theme: name })}
      >
        <div css={PaletteColors} className={`${name}-theme`}>
          {colorList.map(() =>
            <span key={uuidv4()} css={PaletteColor}></span>
          )}
        </div>
        <span css={PaletteTitle}>
          {name} Palette
        </span>
      </li>
    </Fragment>
  );
}

export default ThemePaletteAtom;
