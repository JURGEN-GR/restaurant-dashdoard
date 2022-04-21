import { AuthAction } from '../actions/auth';
import { AuthState } from '../interfaces/auth';

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.payload);

      return { ...state, ...action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};
