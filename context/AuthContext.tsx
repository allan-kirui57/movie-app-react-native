import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;
      const data = await res.json();
      // The backend sends OTP via email or phone

      return { success: true, user_id: data.user_id, email };
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const verifyOtp = async (user_id: string, otp: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, otp }),
      });

      if (!res.ok) return false;
      const data = await res.json();
      setUser(data.user); // Store user info
      return true;
    } catch (err) {
      console.error("OTP verify error:", err);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
