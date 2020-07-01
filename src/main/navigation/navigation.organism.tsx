
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line

const Navigation = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-right: 10px;
  padding: 0 10px;
  width: 30px;

  .swiper-button-prev,
  .swiper-button-next {
    bottom: auto;
    color: var(--mpp-on-primary);
    left: auto;
    font-size: 60px;
    margin: 0;
    outline: none;
    position: relative;
    right: auto;
    top: auto;

    &::after {
      content: none;
    }
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
