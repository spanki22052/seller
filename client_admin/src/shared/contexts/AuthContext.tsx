import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/entities/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: string | null;
  setAuth: (token: string, login: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== "undefined" && !!localStorage.getItem("admin_token");
  });
  const [login, setLogin] = useState<string | null>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("admin_login")
      : null;
  });

  const setAuth = useCallback((token: string, adminLogin: string) => {
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_login", adminLogin);
    setIsAuthenticated(true);
    setLogin(adminLogin);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_login");
    setIsAuthenticated(false);
    setLogin(null);
    // Invalidate all auth queries on logout
    queryClient.invalidateQueries({ queryKey: authKeys.all });
    queryClient.removeQueries({ queryKey: authKeys.all });
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

