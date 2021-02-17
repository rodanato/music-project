export default `
  html {
    background-color: #000;
  }
  .is-paddingless {
    padding: 0 !important;
  }
  .mpp-icon {
    font-family: 'Material Icons';
  }
  .mpp-no-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  .mpp-open-menu-animation {
    opacity: 0;
    transform: scale(0);
    transition: transform 0.5s, opacity 0.25s;
    transform-origin: bottom right;
    
    &.origin-bottom-left {
      transform-origin: bottom left;
    }
    &.origin-top-left {
      transform-origin: top left;
    }
    &.origin-top-right {
      transform-origin: top right;
    }
    &.is-open {
      opacity: 1;
      transform: scale(1);
      transition: transform 0.25s, opacity 0.5s;
    }
  }
  .mpp-show-slowly {
    opacity: 0;
    animation: opacity 0.4s;
    animation-fill-mode: both;
  }
  .mpp-show-slowly--after {
    animation: opacity 1.5s;
  }
  .mpp__loading-block {
    width: 100%;
    margin: 25px;
    background-color: #eaeaeb;
    animation: pulse 1.55s infinite;
  }
  
  @keyframes opacity {
    to {
      opacity: 1;
    }
  }
  @keyframes pulse {
    0% {
      opacity: 0.75;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.75;
    }
    100% {
      opacity: 0.75;
    }
  }
`;
