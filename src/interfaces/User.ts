export interface IUser {
  _id: string;
  name: string;
  email: string;
  dateStart: string;
  birthday: string;
  picture?: string;
  role: Role;
  restaurant: Restaurant;
  department: Department;
}

export interface Role {
  _id: string;
  name: string;
}

export interface Department {
  _id: string;
  name: string;
}

export interface Restaurant {
  _id: string;
  location: string;
}
