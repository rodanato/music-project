
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type MenuItemProps = {
  name: string;
}

const MenuItem = css`
  align-items: center;
  background-color: #efefef;
  cursor: pointer;
  display: flex;
  height: 50px;
  padding: 0 25px;
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--mpp-primary-light);
    color: var(--mpp-on-primary);
  }
`

function MenuItemAtom({ name }: MenuItemProps) {
  return (
    <div css={MenuItem} className="mpp-font--text">{name}</div>
  );
}

export default MenuItemAtom;
