export interface IDish {
  name: string;
  description: string;
  menu: IMenu;
  price: number;
  media_library: string[];
  _id?: string;
}

export interface IMenu {
  _id?: string;
  name: string;
}
