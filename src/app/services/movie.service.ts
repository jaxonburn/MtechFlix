import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Movie } from '../models/movie';
import {  map } from 'rxjs/operators';
import { FirebaseMovie } from '../models/firebase-movie';
import { Comment } from '../models/comment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesRef: AngularFirestoreCollection;
  comment$: Observable<Comment[]>

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    this.moviesRef = this.db.collection<any>('movies');
  }

  //structure of movie document (temp)
  movie = {
    id: 1234,
    comments: [
      {
        user: {},
        text: 'this is text',
        rating: 'this is optional'
      }
    ]
  }
  addMovie(movie: Movie) {
    this.moviesRef.add(movie);
  }
  addComment(movieId: string, title: string, text: string, rating?: number) {
    let movie: FirebaseMovie;
    
    //making the comment
    let comment: Comment = {
      dateCreated: new Date(),
      photoURL: this.auth.user.photoURL,
      name: this.auth.user.displayName,
      userUID: this.auth.user.uid,
      title: title,
      text: text
    }
    console.log('comment', comment);
    if (rating) {
      comment.rating = rating;
    }

    this.db.doc<FirebaseMovie>(`movies/${movieId}`).get().toPromise().then(
      (m) => {
        if (m.exists) {
          movie = m.data() as FirebaseMovie;
          movie.comments.unshift(comment);
          this.moviesRef.doc<FirebaseMovie>(movieId).update(movie);
        }
        else {
          movie = {
            id: movieId,
            comments: [
              comment
            ]
          };
          this.moviesRef.doc<FirebaseMovie>(movieId).set(movie);
        }
      }
    );


  }

  updateComments(movieId: string, comments: Comment[]){
    this.moviesRef.doc(movieId).update({
      id: movieId,
      comments
    });
  } 
  
}
