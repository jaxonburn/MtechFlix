import { Movie } from './movie';

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    watchedMovieIds?: number[];
    favoriteMovieIds?: number[];
}
