import { IScreen } from './Screen';

export interface IRole {
  _id?: string;
  name?: string;
  screens?: IScreen[] | string[];
}
