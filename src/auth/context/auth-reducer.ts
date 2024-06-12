export interface AuthAction {
    type: 'login' | 'logout';
  }
  
  export const authReducer = (state: { logged: boolean }, action: AuthAction) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          logged: true,
        };
      case 'logout':
        return {
          ...state,
          logged: false,
        };
      default:
        return state;
    }
  };
  