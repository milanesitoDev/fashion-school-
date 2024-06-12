import React, { useReducer, ReactNode } from 'react';
import { AuthContext } from './auth-context';
import { authReducer } from '../context/auth-reducer';

const initialState = {
  logged: false,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
