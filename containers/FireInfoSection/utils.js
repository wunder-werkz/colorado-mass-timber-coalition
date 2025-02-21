export const TAB_COUNT = 6;

// Section heights in vh units
export const SECTION_HEIGHTS = {
  0: 100,
  1: 500,
  2: 200,
  3: 200,
  4: 200,
  5: 200,
};

// Calculate total scroll height
export const TOTAL_SCROLL_HEIGHT = Object.values(SECTION_HEIGHTS).reduce(
  (sum, height) => sum + height,
  0
);

// Helper to convert vh to percentage of total scroll height
const vhToProgress = (vh) =>
  Math.min(100, Math.max(0, (vh / TOTAL_SCROLL_HEIGHT) * 100));

// Get the start position of a section in the total scroll (in percentage)
export const getSectionStartPosition = (tabIndex) => {
  let position = 0;
  for (let i = 0; i < tabIndex; i++) {
    position += SECTION_HEIGHTS[i];
  }
  return vhToProgress(position);
};

// Map local section progress (0-100) to global scroll progress
export const mapToGlobalProgress = (tabIndex, localProgress) => {
  const sectionStart = getSectionStartPosition(tabIndex);
  const sectionHeight = vhToProgress(SECTION_HEIGHTS[tabIndex]);
  return sectionStart + (sectionHeight * localProgress) / 100;
};
