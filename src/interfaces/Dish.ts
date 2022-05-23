export interface IDish {
  name: string;
  description: string;
  menu: IMenu;
  price: number;
  media_library: any[];
  _id?: string;
}

export interface IMenu {
  _id?: string;
  name: string;
}
