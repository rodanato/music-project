// @flow
export const bigDesktopSize: number = 1408;
export const desktopSize: number = 1024;
export const tabletSize: number = 768;

const bigDesktopMq: string = `(min-width: ${bigDesktopSize}px)`;
const desktopMq: string = `(min-width: ${desktopSize}px) and (max-width: ${bigDesktopSize}px)`;
const tabletMq: string = `(min-width: ${tabletSize}px) and (max-width: ${desktopSize}px)`;

export const isBigDesktop = (): boolean => window.matchMedia(bigDesktopMq).matches;
export const isDesktop = (): boolean => window.matchMedia(desktopMq).matches;
export const isTablet = (): boolean => window.matchMedia(tabletMq).matches;


// FOR STYLES
type BreakpointsType = {
  [key: string]: number
}

const bp: BreakpointsType = {
  bigDesktop: bigDesktopSize,
  desktop: desktopSize,
  tablet: tabletSize
};

export const responsive = (device: string): string => {
  const bpArray = Object.keys(bp).map((key: string) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) =>
    (device === name)
      ? [...acc, `@media (min-width: ${size}px)`]
      : acc
    , []);

  return result;
}
