import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieAPIService } from '../../services/movieAPI.service';
import { tap } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-movies',
  templateUrl: './user-movies.component.html',
  styleUrls: ['./user-movies.component.scss']
})
export class UserMoviesComponent implements OnInit, OnDestroy{

  constructor (
    public userService: UserService,
    private movieAPIService: MovieAPIService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
  }

  isFavoriteMovie(movieId: number): boolean {
    return this.userService.isFavorited(movieId);
  }

  toggleFavoriteMovie(movieId: number) {
    console.log('toggle fav movie', movieId);
    if (this.userService.isFavorited(movieId)){
      console.log('removing from favorites')
      this.userService.removeFromFavorites(movieId);
    }
    else {
      console.log('adding to favorites')
      this.userService.addToFavorites(movieId);
    }
  }

  isWatched(movieId: number): boolean {
    return this.userService.isWatched(movieId);
  }


  toggleWatchedMovie(movieId: number) {
    console.log('toggled watched')
    if (this.userService.isWatched(movieId)){
      console.log('removing from watched')
      this.userService.removeFromWatched(movieId);
    }
    else {
      console.log('adding to watched')
      this.userService.addToWatched(movieId);
    }
  }
}
