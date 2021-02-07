// @flow
import Swiper from "swiper";
import { SliderStateService } from "app/authenticated/slider/slider.state";

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

  createSwiper() {
    this.swiper = new Swiper(".swiper-container", this.swiperConfig);

    this.swiper.on("init", () => {
      SliderStateService.send("STARTED");
    });

    this.swiper.init();
  }

  onInit(list: any) {
    const $swiperPagination = document.querySelector(".swiper-pagination");
    const $bullets: any = $swiperPagination?.querySelectorAll(
      ".mpp-nav-bullet"
    );

    Array.from($bullets).forEach((b: any, i: number) => {
      b.innerHTML = `Demo text ${list[i]}`;
      b.title = `Demo text ${list[i]}`;
    });
  }

  addEmptySlide() {
    this.swiper.appendSlide('<div class="swiper-slide"></div>');
    const lastSlideIndex = this.swiper.slides.length - 1;
    this.swiper.slideTo(lastSlideIndex);
  }

  addSlideUpdates() {
    const lastSlideIndex = this.swiper.slides.length - 1;
    this.swiper.removeSlide(lastSlideIndex);
    this.swiper.update();
    this.swiper.slideTo(lastSlideIndex);
    SliderStateService.send("GO_TO_IDLE");
  }
}
export default SliderService;
