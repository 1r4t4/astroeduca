import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string; // o email
  role?: string;
  exp?: number;
}

interface AuthContextType {
  user: { email: string; role?: string } | null;
  setUser: (user: { email: string; role?: string } | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser({ email: decoded.sub, role: decoded.role });
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
