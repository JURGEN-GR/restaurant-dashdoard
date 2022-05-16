export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  dateStart: string;
  birthday: string;
  picture?: string;
  role: Role | string;
  restaurant: Restaurant | string;
  department: Department | string;
}

interface Role {
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
