"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { makeApiCall } from "./api-call";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/utils";

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

  // Load token from localStorage when app initializes
  useEffect(() => {
    const token = getToken();

    if(!token?.token) {
      router.push('/');
      return;
    }

    if(token?.token){
      // router.push('/dashboard');
      setAccessToken(token?.token);
    }

  }, []);

  // Sign In Function
  const handleSignIn = async (values: { email: string; password: string }) => {
    try {
      const userData = await makeApiCall<
        User & { tokens: { access: { token: string } } }
      >("login", "POST", values);
      localStorage.setItem("accessToken", userData?.tokens?.access?.token);
      setAccessToken(userData?.tokens?.access?.token);
      setUser(userData?.user);
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
