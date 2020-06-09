
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

type MenuItemProps = {
  name: string;
}

const MenuItem = css`
  align-items: center;
  background-color: #efefef;
  display: flex;
  height: 50px;
  padding: 0 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #c15c15;
  }
`

function MenuItemAtom({ name }: MenuItemProps) {
  return (
    <div css={MenuItem} className="mpp-font--text">{name}</div>
  );
}

export default MenuItemAtom;
