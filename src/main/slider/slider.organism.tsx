
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

import DataMolecule from './data/data.molecule';
import ContentMolecule from './content/content.molecule';
import MenuMolecule from './menu/menu.molecule';

const Slider = css`
  display: flex;
  flex: 1;

  > * {
    border: 1px solid #999;
    margin-right: 20px;
  }
`

function SliderOrganism() {
  return (
    <section css={Slider}>
      <DataMolecule />
      <ContentMolecule />
      <MenuMolecule />
    </section>
  );
}

export default SliderOrganism;
