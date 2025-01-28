import React, { createContext, useState } from "react";

const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshSummary = () => {
    setRefreshTrigger((prev) => !prev); // Toggle the value to trigger refresh
    console.log("toggled");
  };

  return (
    <SummaryContext.Provider value={{ refreshSummary, refreshTrigger }}>
      {children}
    </SummaryContext.Provider>
  );
};

export default SummaryContext;
