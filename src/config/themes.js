// @flow

import { returnEmptyStringIfNotAString } from "utils/helpers";

type ThemeColor = {
  [key: string]: string,
};

export type Theme = {
  name: string,
  colors: ThemeColor[],
};

export const themes: Theme[] = [
  {
    name: "dark",
    colors: [
      { primary: "#000" },
      { "primary-light": "#f1f1f1" },
      { "primary-dark": "#c1c1c1" },
      { secondary: "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" },
    ],
  },
  {
    name: "blue",
    colors: [
      { primary: "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { secondary: "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" },
    ],
  },
  {
    name: "green",
    colors: [
      { primary: "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { secondary: "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" },
    ],
  },
  {
    name: "light",
    colors: [
      { primary: "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { secondary: "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" },
    ],
  },
  {
    name: "pink",
    colors: [
      { primary: "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { secondary: "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" },
    ],
  },
  {
    name: "purple",
    colors: [
      { primary: "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { secondary: "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" },
    ],
  },
  {
    name: "spotify",
    colors: [
      { primary: "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { secondary: "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" },
    ],
  },
];

export const themeStyles: function = themes.map(
  (theme: Theme) => `
  .${theme.name}-theme {
    ${theme.colors
      .map((color: ThemeColor): string => {
        const colorString: ThemeColor | mixed = Object.values(color)[0];
        const printedColor: string = returnEmptyStringIfNotAString(colorString);
        return `
      --mpp-${Object.keys(color)[0]}: ${printedColor};
    `;
      })
      .join("")}
  }
`
);
