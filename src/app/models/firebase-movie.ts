import { Comment } from './comment';

export interface FirebaseMovie {
    id: string,
    comments: Comment[]
  }
