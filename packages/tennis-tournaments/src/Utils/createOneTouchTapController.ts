const ONE_TOUCH_TAP_DIFF_IN_PX = 20;

const createOneTouchTapController = (action: () => void) => {
  let lastClientX: number = -1;
  let lastClientY: number = -1;

  const handleTouchStartEvent = (event: TouchEvent) => {
    lastClientX = event.touches[0].clientX;
    lastClientY = event.touches[0].clientY;
  };

  const handleTouchEndEvent = (event: TouchEvent) => {
    if (event.cancelable) {
      event.preventDefault();
    }

    const clientX = event.changedTouches[0].clientX;
    const clientY = event.changedTouches[0].clientY;

    // one touch tap detected

    if (
      Math.abs(clientX - lastClientX) <= ONE_TOUCH_TAP_DIFF_IN_PX &&
      Math.abs(clientY - lastClientY) <= ONE_TOUCH_TAP_DIFF_IN_PX
    ) {
      action();
    }

    lastClientX = -1;
    lastClientY = -1;
  };

  return {
    handleTouchStartEvent,
    handleTouchEndEvent,
  };
};

export { createOneTouchTapController };
