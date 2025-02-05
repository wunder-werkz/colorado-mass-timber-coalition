import { createContext, useContext, useState, useCallback } from "react";

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [timelines, setTimelines] = useState([]);

  const registerTimeline = useCallback((index, tl) => {
    setTimelines((prev) => {
      const newTimelines = [...prev];
      newTimelines[index] = tl;
      return newTimelines;
    });
  }, []);

  const resetTimeline = useCallback(
    (index) => {
      timelines[index]?.progress(0);
    },
    [timelines]
  );

  return (
    <TabContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        timelines,
        registerTimeline,
        resetTimeline,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};
