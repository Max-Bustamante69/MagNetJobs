"use client"
// SessionProvider.js (Client Component)
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
    throw new Error("useUser must be used within a SessionProvider");
  }
  return context;
}
