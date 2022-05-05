import { AuthAction } from '../actions/auth';
import { IUser } from '../interfaces/User';

export const authReducer = (
  state: IUser | null,
  action: AuthAction
): IUser | null => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
};
