// EXTERNAL
import React, { useEffect, Suspense } from 'react'; // eslint-disable-line
import { v4 as uuidv4 } from "uuid";
/** @jsx jsx */
import { jsx, css } from '@emotion/core'; // eslint-disable-line
import Swiper, { SwiperOptions } from 'swiper';
import "swiper/css/swiper.css";

// DEPENDENCIES
import LoadingAtom from '../../shared/loading.atom';
import NavigationOrganism from '../navigation/navigation.organism';
import SongMolecule from '../../shared/song.molecule';

// STYLES
import {
  slider,
  swiperContainer,
  swiperContent,
  swiperSlide,
  contentListItem,
  SwiperPagination
} from './slider.styles';

const ContentMolecule = React.lazy(() => import('./content/content.molecule'));
const DataMolecule = React.lazy(() => import('./data/data.molecule'));
const MenuMolecule = React.lazy(() => import('./menu/menu.molecule'));

const swiperConfig: SwiperOptions = {
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
    renderBullet: function (index: number, className: string) {
      return `
        <div class="${className}">
          <span class="mpp-nav-bullet mpp-open-menu-animation">
          </span>
        </div>
      `
    }
  },
};

function SliderOrganism() {
  const slideList = new Array(4).fill(1);

  useEffect(() => {
    const swiper: any = new Swiper('.swiper-container', swiperConfig);

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

  const songSampleData = {
    name: "Sex on fire",
    artist: "Kings of Leon",
    album: "I don't know"
  };

  return (
    <section css={[slider]}>
      <div className="swiper-container" css={[swiperContainer]}>
        <div className="swiper-wrapper">
          {slideList.map((_, i) =>
            <div className="swiper-slide" css={[swiperSlide]} key={uuidv4()}>
              <div className="swiper-content" css={[swiperContent]}>
                <Suspense fallback={<LoadingAtom flex="1.5" />}>
                  <DataMolecule />
                </Suspense>
                <Suspense fallback={<LoadingAtom flex="2" />}>
                  <ContentMolecule>
                    Page {i + 1}

                    <ul>
                      <li css={[contentListItem]}>
                        <SongMolecule data={songSampleData} />
                      </li>
                    </ul>
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
