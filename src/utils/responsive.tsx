export const bigDesktopSize = 1408;
export const desktopSize = 1024;
export const tabletSize = 768;

const bigDesktopMq = `(min-width: ${bigDesktopSize}px)`;
const desktopMq = `(min-width: ${desktopSize}px) and (max-width: ${bigDesktopSize}px)`;
const tabletMq = `(min-width: ${tabletSize}px) and (max-width: ${desktopSize}px)`;

export const isBigDesktop = () => window.matchMedia(bigDesktopMq).matches;
export const isDesktop = () => window.matchMedia(desktopMq).matches;
export const isTablet = () => window.matchMedia(tabletMq).matches;


// FOR STYLES
type BreakpointsType = {
  [key: string]: number
}

const bp: BreakpointsType = {
  bigDesktop: bigDesktopSize,
  desktop: desktopSize,
  tablet: tabletSize
};

export const responsive = (device: string) => {
  const bpArray = Object.keys(bp).map((key: string) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) =>
    (device === name)
      ? [...acc, `@media (min-width: ${size}px)`]
      : acc
    , []);

  return result;
}
