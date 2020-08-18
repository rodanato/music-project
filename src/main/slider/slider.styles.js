// @flow
import type { ComponentType } from "react"; // eslint-disable-line
import styled from '@emotion/styled';
import type { SwiperPaginationProps } from './slider.types';

export const slider: string = `
  display: flex;
  padding: 50px 0 50px 50px;
  width: 100%;
`;

export const contentListItem: string = `
  margin-bottom: 10px;
`;

export const swiperContainer: string = `
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

export const swiperContent: string = `
  display: flex;
  flex: 1;
  height: 100%;

  > * {
    margin-right: 10px;
  }
`;

export const swiperSlide: string = `
  overflow: hidden;
`;


export const SwiperPagination: ComponentType<SwiperPaginationProps> = styled('div')`
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
