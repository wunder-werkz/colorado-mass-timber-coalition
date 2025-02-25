"use client";

import { createContext, useContext } from "react";

const EventsContext = createContext({
  pastEvents: [],
  upcomingEvents: [],
});

export function EventsProvider({ children, pastEvents, upcomingEvents }) {
  return (
    <EventsContext.Provider value={{ pastEvents, upcomingEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
