export interface Student {
  id: number;
  name: string;
  lastname: string;
  university: string;
  comment: string;
  image?: Image;
}

export interface Image {
  id: number;
  imgByte: string;
  name: string;
  type: string;
}
