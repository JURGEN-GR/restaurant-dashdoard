import { IUser } from '../../interfaces/User';

export type AuthAction = { type: 'LOGIN'; payload: IUser } | { type: 'LOGOUT' };

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
