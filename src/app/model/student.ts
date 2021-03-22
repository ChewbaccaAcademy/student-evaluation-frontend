import { Image } from '../model/Image';

export interface Student {
  id: number;
  name: string;
  lastname: string;
  university: string;
  comment: string;
  image?: Image;
}