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

    this.swiper.on("slideNextTransitionEnd", () => {
      if (
        this.isLastSlide() &&
        SliderStateService.state.matches("addingslide")
      ) {
        SliderStateService.send("UPDATE_SLIDE");
      }
    });

    this.swiper.init();
  }

  isLastSlide(): boolean {
    return this.swiper.activeIndex === this.swiper.slides.length - 1;
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
    this.swiper.addSlide(
      this.swiper.slides.length,
      '<div class="swiper-slide"></div>'
    );
    const lastSlideIndex = this.swiper.slides.length - 1;
    this.swiper.slideTo(lastSlideIndex);
  }

  addSlideUpdates() {
    this.swiper.update();
    const lastSlideIndex = this.swiper.slides.length - 1;
    // this.swiper.removeSlide(lastSlideIndex);
    this.swiper.slideTo(lastSlideIndex);
  }
}
export default SliderService;
