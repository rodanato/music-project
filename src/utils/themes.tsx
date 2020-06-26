
export const themes = [
  {
    name: "blue",
    colors: [
      { "primary": "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { "secondary": "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" }
    ]
  },
  {
    name: "green",
    colors: [
      { "primary": "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { "secondary": "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" }
    ]
  },
  {
    name: "light",
    colors: [
      { "primary": "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { "secondary": "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" }
    ]
  },
  {
    name: "pink",
    colors: [
      { "primary": "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { "secondary": "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" }
    ]
  },
  {
    name: "purple",
    colors: [
      { "primary": "#5742cc" },
      { "primary-light": "#8d6fff" },
      { "primary-dark": "#0f189a" },
      { "secondary": "#fff" },
      { "secondary-dark": "#cccccc" },
      { "on-primary": "#fff" },
      { "on-secondary": "#000" }
    ]
  },
  {
    name: "spotify",
    colors: [
      { "primary": "#26f2aa" },
      { "primary-light": "#73ffdc" },
      { "primary-dark": "#00be7b" },
      { "secondary": "#fff" },
      { "secondary-dark": "#009a78" },
      { "on-primary": "#000000" },
      { "on-secondary": "#000000" }
    ]
  }
];

export const themeStyles = themes.map(theme => `
  .${theme.name}-theme {
    ${theme.colors.map((color: any) => `
      --mpp-${Object.keys(color)[0]}: ${Object.values(color)[0]};
    `).join("")}
  }
`);
