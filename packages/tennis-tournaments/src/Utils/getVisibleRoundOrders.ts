type VisibleRoundOrder = 0 | 1 | 2;

/**
 * Determines what rounds need to show in responsive mode
 *
 * 0 is always visible for mobile devices
 * 1 is always visible for tablets
 * 2 is always visible for desktop
 */
const getVisibleRoundOrders = (
  currentIndex: 0 | 1 | 2
): VisibleRoundOrder[] => {
  if (currentIndex === 0) {
    return [0, 1, 2];
  }

  if (currentIndex === 1) {
    return [1, 0, 2];
  }

  return [2, 1, 0];
};

export { type VisibleRoundOrder, getVisibleRoundOrders };
