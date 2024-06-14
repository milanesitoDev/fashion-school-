import { createContext } from "react";

interface AuthContextProps {
  authState: { logged: boolean; user?: { email: string } };
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
