// context/UserContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserContext } from "@/utils/GetUserContext"; // Adjust the import path

// Create context
const UserContext = createContext(null);

// UserProvider to fetch and provide user and session data
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userOnSession = await getUserContext();
        if (!userOnSession) {
          router.push("/login");
        } else {
          setUser(userOnSession.user);
          setSession(userOnSession.session);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, session }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easier access to the context
export function useUserContext() {
  return useContext(UserContext);
}
