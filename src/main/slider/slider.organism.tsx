import React, { useEffect, Suspense } from 'react'; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import styled from '@emotion/styled';
import Swiper from 'swiper';
import "swiper/css/swiper.css";

import NavigationOrganism from '../navigation/navigation.organism';
import LoadingAtom from '../../shared/loading.atom';

const DataMolecule = React.lazy(() => import('./data/data.molecule'));
const ContentMolecule = React.lazy(() => import('./content/content.molecule'));
const MenuMolecule = React.lazy(() => import('./menu/menu.molecule'));

type SwiperPaginationProps = {
  slideListLength: number
};

const Slider = css`
  display: flex;
  padding: 50px 0 50px 50px;
  width: 100%;
`

const SwiperSlide = css`
  overflow: hidden;
`

const SwiperPagination = styled('div')<SwiperPaginationProps>`
  &.swiper-pagination {
    display: flex;
    flex-direction: column;
    justify-content: ${props =>
      props.slideListLength > 10  ? 'normal' : 'center'};
    margin: 10px 0;
    overflow: visible;
    position: relative;
  }

  .swiper-pagination-bullet {
    background-color: var(--mpp-secondary-dark);
    margin-bottom: 15px;
    min-height: 20px !important;
    min-width: 20px !important;
    opacity: 1;
    outline: none;
    position: relative;

    &.swiper-pagination-bullet-active {
      background-color: var(--mpp-on-primary);
    }
    &:hover .mpp-nav-bullet {
      opacity: 1;
      transform: scale(1);
      transition: transform 0.25s, opacity 0.5s;
    }
  }
  .mpp-nav-bullet {
    color: var(--mpp-on-primary);
    font-size: 15px;
    line-height: 20px;
    max-width: 120px;
    overflow: hidden;
    position: absolute;
    right: 30px;
    text-overflow: ellipsis;
    top: 0;
    width: auto;
    white-space: nowrap;
  }
`;

const SwiperContainer = css`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`

const SwiperWrapper = css`
`

const SwiperContent = css`
  display: flex;
  flex: 1;
  height: 100%;

  > * {
    margin-right: 10px;
  }
`

function SliderOrganism() {
  const slideList = new Array(4).fill(1);

  useEffect(() => {
    const swiper: any = new Swiper('.swiper-container', {
      init: false,
      direction: 'vertical',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        dynamicMainBullets: 10,
        clickable: true,
        renderBullet: function (index, className) {
          return `
            <div class="${className}">
              <span class="mpp-nav-bullet mpp-open-menu-animation">
              </span>
            ${(index + 1)}
            </div>
          `
        }
      },
    });

    swiper.on('init', () => {
      const $swiperPagination = document.querySelector(".swiper-pagination");
      const $bullets: any = $swiperPagination?.querySelectorAll(".mpp-nav-bullet");
      
      Array.from($bullets).forEach((b: any, i: number) => {
        b.innerHTML = `Demo text ${slideList[i]}`;
        b.title = `Demo text ${slideList[i]}`;
      })
    });

    swiper.init();
  }, [slideList]);

  return (
    <section css={Slider}>
      <div className="swiper-container" css={SwiperContainer}>
        <div className="swiper-wrapper" css={SwiperWrapper}>
          {slideList.map((_, i) =>
            <div className="swiper-slide" css={SwiperSlide} key={uuidv4()}>
              <div css={SwiperContent}>
                <Suspense fallback={<LoadingAtom flex="1.5" />}>
                  <DataMolecule />
                </Suspense>              
                <Suspense fallback={<LoadingAtom flex="2" />}>
                  <ContentMolecule>
                    Page {i + 1}
                  </ContentMolecule>
                </Suspense>              
                <Suspense fallback={<LoadingAtom flex="1" />}>
                  <MenuMolecule />
                </Suspense>              
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationOrganism>
        <div className="swiper-button-prev material-icons">keyboard_arrow_up</div>
        <SwiperPagination 
          className="swiper-pagination" 
          slideListLength={slideList.length} 
        />
        <div className="swiper-button-next material-icons">keyboard_arrow_down</div>
      </NavigationOrganism>
    </section>
  );
}

export default SliderOrganism;
