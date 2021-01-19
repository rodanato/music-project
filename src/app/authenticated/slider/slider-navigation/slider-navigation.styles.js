// @flow
import type { ComponentType } from "react"; // eslint-disable-line
// $FlowIgnore
import styled from "@emotion/styled";
import type { SwiperPaginationProps } from "./slider-navigation.types";
export const SwiperPagination: ComponentType<SwiperPaginationProps> = styled(
  "div"
)`
  &.swiper-pagination {
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
      props.slideListLength > 10 ? "normal" : "center"};
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
