/* eslint-disable no-undef,no-unused-expressions,arrow-parens */

const onKeyDownEvents = {};

document.onkeydown = e => {
  switch (e.keyCode) {
    case 37:
      onKeyDownEvents.onKeyLeft();
      break;
    case 38:
      onKeyDownEvents.onKeyUp();
      break;
    case 39:
      onKeyDownEvents.onKeyRight();
      break;
    case 40:
      onKeyDownEvents.onKeyDown();
      break;
    default:
      break;
  }
};

module.exports = {
  onKeyLeft: (fn) => {
    onKeyDownEvents.onKeyLeft = fn;
  },
  onKeyUp: (fn) => {
    onKeyDownEvents.onKeyUp = fn;
  },
  onKeyRight: (fn) => {
    onKeyDownEvents.onKeyRight = fn;
  },
  onKeyDown: (fn) => {
    onKeyDownEvents.onKeyDown = fn;
  },
};
