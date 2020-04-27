import { User } from './user';

export interface Comment {
    userUID: string,
    photoURL: string,
    name: string,
    title: string,
    text: string,
    dateCreated: Date,
    rating?: number
  }
