export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  dateStart: string;
  birthday: string;
  picture?: string;
  role: Role;
  restaurant: Restaurant;
  department: Department;
}

interface Role {
  _id: string;
  name: string;
  screens: Screens[];
}

interface Screens {
  _id: string;
  name: string;
}

interface Department {
  _id: string;
  name: string;
}

interface Restaurant {
  _id: string;
  location: string;
}
