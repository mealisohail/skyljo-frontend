import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getToken(): string | null {
  const storedToken = localStorage.getItem("accessToken");
  if (!storedToken) return null;
  const tokenOBJ = JSON.parse(storedToken);
  return tokenOBJ;
}

