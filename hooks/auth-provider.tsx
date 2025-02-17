"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { makeApiCall } from "./api-call";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/utils";
import Image from "next/image";

type User = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: null | User;
  accessToken: null | string;
  handleSignIn: (values: { email: string; password: string }) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Load token from localStorage and handle loading state when app initializes
  useEffect(() => {
    const token = getToken();

    if (token?.token && pathname === "/") {
      router.push("/dashboard");
      setLoading(false);
      return;
    }

    if (!token?.token) {
      router.push("/");
      setLoading(false);
      return;
    }

    setAccessToken(token?.token);
    setLoading(false);
  }, []);

  // Sign In Function
  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      const userData = await makeApiCall("login", "POST", values);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(userData?.tokens?.access)
      );
      setAccessToken(userData?.tokens?.access?.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async (token: string) => {
    try {
      const profile = await makeApiCall<User>("me", "GET", null, token);
      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      handleLogout();
    }
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setAccessToken(null);
    router.push("/"); // Redirect to login page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, accessToken, handleSignIn, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext) as AuthContextType;
