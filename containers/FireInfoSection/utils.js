export const TAB_COUNT = 6;
export const SECTION_PERCENTAGE = 100 / TAB_COUNT;

export const SECTION_HEIGHTS = {
  0: 200, // Section 1: 200vh
  1: 300, // Section 2: 300vh
  2: 400, // Section 3: 400vh
  3: 200, // Section 4: 200vh
  4: 600, // Section 5: 600vh
  5: 300, // Section 6: 300vh
};

// Buffer height for each section (in vh)
export const SECTION_BUFFER = 20;

// Calculate total scroll height including buffers
export const TOTAL_SCROLL_HEIGHT = Object.values(SECTION_HEIGHTS).reduce(
  (sum, height) => sum + height + SECTION_BUFFER * 2, // multiply buffer by 2 for enter/exit
  0
);

// Helper to convert vh to percentage of total scroll height
const vhToProgress = (vh) => (vh / TOTAL_SCROLL_HEIGHT) * 100;

// Helper to get section start position in the total scroll
export const getSectionStartPosition = (tabIndex) => {
  // Add buffer to the start position
  const startWithBuffer = Object.entries(SECTION_HEIGHTS).reduce(
    (sum, [index, height]) => {
      if (parseInt(index) < tabIndex) {
        return sum + height + SECTION_BUFFER * 2;
      }
      return sum;
    },
    0
  );

  // Add entry buffer for current section
  return vhToProgress(startWithBuffer + SECTION_BUFFER);
};

// Update mapToGlobalProgress to handle vh units
export const mapToGlobalProgress = (tabIndex, localProgress) => {
  const sectionStart = getSectionStartPosition(tabIndex);
  const sectionHeight = SECTION_HEIGHTS[tabIndex];

  // Convert section height to progress percentage
  const sectionProgress = (localProgress / 100) * vhToProgress(sectionHeight);

  return Math.min(100, sectionStart + sectionProgress);
};

// Calculate the trigger point for tab changes
export const getTabTriggerPoint = (tabIndex) => {
  // For the first tab, trigger at the start
  if (tabIndex === 0) return 0;

  // For other tabs, trigger at the end of the previous section
  const previousIndex = tabIndex - 1;
  const previousSectionStart = getSectionStartPosition(previousIndex);
  const previousSectionHeight = vhToProgress(SECTION_HEIGHTS[previousIndex]);
  const bufferProgress = vhToProgress(SECTION_BUFFER);

  // Calculate trigger point at the end of the previous section plus buffer
  return Math.min(
    100,
    previousSectionStart + previousSectionHeight + bufferProgress
  );
};
