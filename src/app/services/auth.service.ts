import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { User } from '../models/user';

import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, share, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieAPIService } from './movieAPI.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  userRef: AngularFirestoreDocument;
  userSub: Subscription;
  favoriteMovies: Observable<Movie>[];
  watchedMovies: Observable<Movie>[];

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private movieAPIService: MovieAPIService,
  ) {
    console.log('auth service constructor')
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     console.log(user);
    //     if (user) {
    //       console.log('in auth service switch map')
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    //     }
    //     else {
    //       return of(null)
    //     }
    //   }),
    //   tap(),
    //   share()
    // );
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userSub = this.db.doc(`users/${user.uid}`).valueChanges().subscribe((fsUser: User) => {
          console.log(fsUser);
          this.user = fsUser;
          this.userRef = this.db.doc<User>(`users/${this.user.uid}`);
          this.favoriteMovies = [];
          console.log('fav movies id', fsUser.favoriteMovieIds)
          fsUser.favoriteMovieIds.forEach(id => {
            this.favoriteMovies.push(this.movieAPIService.getMovieById(id));
          });
          this.watchedMovies = [];
          console.log('watchedMovies', fsUser.watchedMovieIds)
          fsUser.watchedMovieIds.forEach(id => {
            this.watchedMovies.push(this.movieAPIService.getMovieById(id));
          });
        });
      }
    })
  }

  async googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    //TODO: add catch if user login fails aka no internet etc
    await this.updateUserData(credential.user);
    console.log('user signin', this.user)
    this.router.navigate(['movie']);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.user = null;
    await this.userSub.unsubscribe();
    return this.router.navigate(['/']);
  }

  private async updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      favoriteMovieIds: [],
      watchedMovieIds: []
    };

    await userRef.set(data, { merge: true });

  }
}
