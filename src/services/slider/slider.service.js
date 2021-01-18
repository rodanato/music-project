// @flow
import Swiper from "swiper";
import type { SlideContent } from "shared/types/slide.types";

class SliderService {
  static instance: SliderService;
  static getInstance(): SliderService {
    if (!SliderService.instance) {
      SliderService.instance = new SliderService();
    }

    return SliderService.instance;
  }

  swiper: any;
  swiperConfig: any = {
    init: false,
    grabCursor: true,
    direction: "vertical",
    dynamicBullets: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      dynamicMainBullets: 10,
      clickable: true,
      renderBullet: function(index: number, className: string) {
        return `
          <div class="${className}">
            <span class="mpp-nav-bullet mpp-open-menu-animation">
            </span>
          </div>
        `;
      },
    },
  };
  _slideList: any[] = [];

  set slideList(list) {
    this._slideList = list;
    document.dispatchEvent(new CustomEvent("slideListUpdated"));
  }

  get slideList(): any {
    return this._slideList;
  }

  createSwiper() {
    this.swiper = new Swiper(".swiper-container", this.swiperConfig);

    this.swiper.on("init", () => {
      const $swiperPagination = document.querySelector(".swiper-pagination");
      const $bullets: any = $swiperPagination?.querySelectorAll(
        ".mpp-nav-bullet"
      );

      Array.from($bullets).forEach((b: any, i: number) => {
        b.innerHTML = `Demo text ${this.slideList[i]}`;
        b.title = `Demo text ${this.slideList[i]}`;
      });
    });
  }

  addSlide(slideContent: SlideContent) {
    this.slideList = [...this.slideList, slideContent];
    this.swiper.update();
    this.swiper.slideNext();
  }
}
export default SliderService;
