export default `
  html {
    background-color: #000;
  }
  .mpp-icon {
    font-family: 'Material Icons';
  }
  .mpp-show-slowly {
    opacity: 0;
    animation: opacity 1.5s;
    animation-fill-mode: both;
  }
  .mpp__loading-block {
    width: 100%;
    height: 100%;
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
      opacity: 1;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;