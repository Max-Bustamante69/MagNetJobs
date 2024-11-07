"use client";

import { createContext, useContext } from "react";

const SessionContext = createContext();

export function SessionProvider({ children, value }) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useUser() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
