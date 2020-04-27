import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { tap, map } from 'rxjs/operators'
import { FirebaseMovie } from '../models/firebase-movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    // this.auth.user$.subscribe(user => {
    //   console.log('setting user and user ref')
      // this.auth.userRef = this.db.doc<User>(`users/${user.uid}`);
    //   this.auth.user = user;
    // });

  }
  addToFavorites(movieId: number) {
    if (this.auth.user.favoriteMovieIds) {
      this.auth.user.favoriteMovieIds.push(movieId);
    }
    else {
      this.auth.user.favoriteMovieIds = [movieId];
    }
    this.auth.userRef.update(this.auth.user);
  }

  addToWatched(movieId: number) {
    if (this.auth.user.watchedMovieIds) {
      this.auth.user.watchedMovieIds.push(movieId);
    }
    else {
      this.auth.user.watchedMovieIds = [movieId];
    }
    this.auth.userRef.update(this.auth.user);
  }
  removeFromFavorites(movieId: number) {
    if (this.auth.user.favoriteMovieIds) {
      this.auth.user.favoriteMovieIds = this.auth.user.favoriteMovieIds.filter(mId => mId !== movieId);
    }
    this.auth.userRef.update(this.auth.user);
  }
  removeFromWatched(movieId: number) {
    if (this.auth.user.watchedMovieIds) {
      this.auth.user.watchedMovieIds = this.auth.user.watchedMovieIds.filter(mId => mId !== movieId);
    }
    this.auth.userRef.update(this.auth.user);
  }
  isFavorited(movieId: number): boolean {
    if (this.auth.user.favoriteMovieIds){
      return this.auth.user.favoriteMovieIds.includes(movieId);
    }
    return false;
  }
  isWatched(movieId: number): boolean {
    if (this.auth.user.watchedMovieIds){
      return this.auth.user.watchedMovieIds.includes(movieId);
    }
    return false;
  }
  getFavoritesObservable(): Observable<number[]> | null {
    if (this.auth.user) {
      return this.db.doc<User>(`users/${this.auth.user.uid}`).valueChanges().pipe(
        map(user => {
          return user.favoriteMovieIds;
        })
      );
    } 
    return null;
  }
}
