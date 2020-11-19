// @flow
export const paletteItem: string = `
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

export const paletteTitle: string = `
  text-transform: capitalize;
  width: 100%;
`;

export const paletteColors: string = `
  display: flex;
  margin-bottom: 5px;
  width: 100%;
`;

export const paletteColor: string = `
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
