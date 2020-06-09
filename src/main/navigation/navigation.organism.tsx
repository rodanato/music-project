
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Navigation = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100px;

  .swiper-button-prev,
  .swiper-button-next {
    bottom: auto;
    left: auto;
    margin: 0;
    position: relative;
    right: auto;
    top: auto;
  }
`

function NavigationOrganism(props: any) {
  return (
    <section className="mpp-font--bold" css={Navigation}>
      {props.children}
    </section>
  );
}

export default NavigationOrganism;
