export const TAB_COUNT = 6;
export const SECTION_PERCENTAGE = 100 / TAB_COUNT;

export const SECTION_HEIGHTS = {
  0: 70, // Section heights in vh units
  1: 500,
  2: 400,
  3: 200,
  4: 600,
  5: 300,
};

// Buffer height for transitions (in vh)
export const TRANSITION_BUFFER = 100;

// Calculate total scroll height including transition buffers
export const TOTAL_SCROLL_HEIGHT = Object.values(SECTION_HEIGHTS).reduce(
  (sum, height) => sum + height + TRANSITION_BUFFER,
  TRANSITION_BUFFER
);

// Helper to convert vh to percentage of total scroll height
const vhToProgress = (vh) =>
  Math.min(100, Math.max(0, (vh / TOTAL_SCROLL_HEIGHT) * 100));

// Helper to get section start position in the total scroll
export const getSectionStartPosition = (tabIndex) => {
  let position = TRANSITION_BUFFER;
  for (let i = 0; i < tabIndex; i++) {
    position += SECTION_HEIGHTS[i] + TRANSITION_BUFFER;
  }
  return vhToProgress(position);
};

// Map local section progress (0-100) to global scroll progress
export const mapToGlobalProgress = (tabIndex, localProgress) => {
  const sectionStart = getSectionStartPosition(tabIndex);
  // Start content after the transition buffer
  const contentStart = sectionStart + vhToProgress(TRANSITION_BUFFER);
  const contentHeight = vhToProgress(
    SECTION_HEIGHTS[tabIndex] - TRANSITION_BUFFER * 2
  );
  return contentStart + (contentHeight * localProgress) / 100;
};

// Map transition progress (0-100) to the buffer period
export const mapToTransitionProgress = (tabIndex, localProgress) => {
  // For the first tab
  if (tabIndex === 0) {
    return vhToProgress((localProgress / 100) * TRANSITION_BUFFER);
  }

  // For other tabs, calculate from the end of the previous section's content
  const currentStart = getSectionStartPosition(tabIndex);
  // The transition happens in the buffer space before the current section
  return (
    currentStart -
    vhToProgress(TRANSITION_BUFFER) +
    (vhToProgress(TRANSITION_BUFFER) * localProgress) / 100
  );
};

// Calculate the trigger point for tab changes
export const getTabTriggerPoint = (tabIndex) => {
  if (tabIndex === 0) return 0;

  const previousIndex = tabIndex - 1;
  const previousStart = getSectionStartPosition(previousIndex);
  const previousHeight = vhToProgress(SECTION_HEIGHTS[previousIndex]);

  return previousStart + previousHeight;
};
