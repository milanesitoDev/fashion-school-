export interface AuthAction {
  type: 'login' | 'logout';
  payload?: {
    email: string;
  };
}

export const authReducer = (state: { logged: boolean; user?: { email: string } }, action: AuthAction) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        logged: true,
        user: action.payload,
      };
    case 'logout':
      return {
        ...state,
        logged: false,
        user: undefined,
      };
    default:
      return state;
  }
};
