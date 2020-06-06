
type BreakpointsType = {
  [key: string]: number
}

const bp: BreakpointsType = {
  desktop: 1024,
  tablet: 768
};

const responsive = (device: string) => {
  const bpArray = Object.keys(bp).map((key: string) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) =>
    (device === name)
      ? [...acc, `@media (min-width: ${size}px)`]
      : acc
    , []);

  return result;
}

export default responsive;
