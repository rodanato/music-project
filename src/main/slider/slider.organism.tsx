import React, { useEffect } from 'react'; // eslint-disable-line

/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import Swiper from 'swiper';
import "swiper/css/swiper.css";

import DataMolecule from './data/data.molecule';
import ContentMolecule from './content/content.molecule';
import MenuMolecule from './menu/menu.molecule';
import NavigationOrganism from '../navigation/navigation.organism';

const Slider = css`
  display: flex;
  width: 100%;
`

const SwiperSlide = css`
  height: 100% !important;
`

const SwiperPagination = css`
  &.swiper-pagination {
    display: flex;
    flex-direction: column;
    height: auto !important;
    position: relative;
  }

  .swiper-pagination-bullet {
    height: 20px;
    margin-bottom: 10px;
    width: 20px;
  }
`

const SwiperContainer = css`
  height: 100%;
  width: 100%;
`

const SwiperContent = css`
  display: flex;
  flex: 1;
  height: 100%;

  > * {
    margin-right: 20px;
  }
`

function SliderOrganism() {
  useEffect(() => {
    new Swiper('.swiper-container', {
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
      },
    });
  }, []);

  return (
    <section css={Slider} className="mpp-show-slowly">
      <div className="swiper-container" css={SwiperContainer}>
        <div className="swiper-wrapper">
          <div className="swiper-slide" css={SwiperSlide}>
            <div css={SwiperContent}>
              <DataMolecule />
              <ContentMolecule />
              <MenuMolecule />
            </div>
          </div>
          <div className="swiper-slide" css={SwiperSlide}>
            <div css={SwiperContent}>
              <DataMolecule />
              <ContentMolecule />
              <MenuMolecule />
            </div>
          </div>
        </div>
      </div>

      <NavigationOrganism>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination" css={SwiperPagination}></div>
        <div className="swiper-button-next"></div>
      </NavigationOrganism>
    </section>
  );
}

export default SliderOrganism;
