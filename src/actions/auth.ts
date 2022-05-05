import { AuthState } from '../interfaces/auth';
import { IUser } from '../interfaces/User';

export type AuthAction = { type: 'LOGIN'; payload: IUser } | { type: 'LOGOUT' };
