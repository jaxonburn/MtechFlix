import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { StarRatingComponent } from 'ng-starrating';
import { MovieAPIService } from '../../services/movieAPI.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { FirebaseMovie } from 'src/app/models/firebase-movie';
import { User } from 'src/app/models/user';
import { Comment } from '../../models/comment';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id: string;
  selectedMovie;

  //comment stuff
  comment = {
    title: "",
    text: "",
    useRating: false,
    rating: null
  }


  comments: Comment[];
  commentsSub: Subscription;

  movieGenres = [];

  movieProd = [];

  commentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieAPIService: MovieAPIService,
    private movieService: MovieService,
    private db: AngularFirestore,
    public auth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));

    this.movieAPIService.getMovieById(this.id).subscribe(movie => {
      console.log(movie)
      this.selectedMovie = movie;

      this.handleGenres(movie.genres)
      this.handleCompanies(movie.production_companies)
    });

    this.commentsSub = this.db.doc<FirebaseMovie>(`movies/${this.id}`).valueChanges().pipe(
      map(movie => {
        return movie.comments;
      })
    ).subscribe(comments => { this.comments = comments });

    this.commentForm = new FormGroup(
      {
        'title': new FormControl(this.comment.title, Validators.required),
        'rating': new FormControl(this.comment.rating),
        'text': new FormControl(this.comment.text, Validators.required),
      }
    );
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }

  handleGenres(g) {
    g.forEach(genre => {
      this.movieGenres.push(genre.name)
    });
  }

  handleCompanies(c) {
    c.forEach(comp => {
      this.movieProd.push(comp.name)
    });
  }

  runtime(m: number) {
    let hrs: number = 0;
    let min: number = 0;
    if (m > 60) {
      while (m > 60) {
        hrs++;
        m -= 60;
      }
      min = m;
      return `${hrs}h ${min}m`
    }
    else {
      min = m;
      return `${min}m`
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  submitComment() {
    let title = this.commentForm.get('title').value;
    let text = this.commentForm.get('text').value;
    let rating = this.commentForm.get('rating').value;
    if(text !== "" && rating !== "") {
      if (this.comment.useRating) {
        this.movieService.addComment(this.id, title, text, rating || 0);
      }
      else {
        this.movieService.addComment(this.id, title, text);
      }
    }
    
  }
  deleteComment(comment: Comment) {
    console.log('comments before deleted', this.comments);
    console.log('comment to be deleted', comment);
    let newComments = this.comments.filter(c => c !== comment);
    console.log('comments after deleted', newComments);
    this.movieService.updateComments(this.id, newComments);
  }


}
