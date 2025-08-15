import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { apiFetch } from "@/services/apiFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

        if (storedUser && storedAccessToken && storedRefreshToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
      }
    };
    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiFetch('/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log("Login response:", data);

      if (!data.success) return false;

      return { success: true, user_id: data.user_id, email };
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const verifyOtp = async (user_id: string, otp: string) => {
    try {
      const data = await apiFetch("/verify-otp", {
        method: "POST",
        body: JSON.stringify({ user_id, otp }),
      });

      // if (!res.ok) return false;

      // Save to state
      setUser(data.user);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);

      // Persist in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("accessToken", data.access_token);
      await AsyncStorage.setItem("refreshToken", data.refresh_token);

      return true;
    } catch (err) {
      console.error("OTP verify error:", err);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);
  };
  // Refresh Access Token
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const res = await apiFetch("/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!res.ok) {
        await logout();
        return false;
      }

      const data = await res.json();
      setAccessToken(data.access_token);
      await AsyncStorage.setItem("accessToken", data.access_token);
      return true;
    } catch (err) {
      console.error("Token refresh error:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
