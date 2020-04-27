import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from 'src/app/services/movieAPI.service';
import { StarRatingComponent } from 'ng-starrating';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  query = "";
  movieList;
  firstLoad: Boolean = true;
  show: Boolean = true;
  title = "Top Rated Movies"
  topRated;
  screenwidth = window.innerWidth;
  
  constructor(
    public movieAPIService: MovieAPIService,
    public auth: AuthService,
    public userService: UserService
  ) { }

  

  ngOnInit(): void {
    this.movieAPIService.getMoviesObservable().subscribe(movies => {
      // console.log(movies)
      this.movieList = movies.results;
      this.topRated = movies.results;
    })
  }

  

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  setSearch(event){
    this.query = event.target.value
    
  }
  searchMovie(){
    this.title = ""
    if(this.query == ""){
      this.title = "Top Rated Movies"
      this.movieList = this.topRated;
      return ;
    }
    this.movieAPIService.searchMovie(this.query).subscribe(movies => {
      if(movies.results.length == 0){
        return this.show = false;
      }else{
        this.show = true;
      }
      this.title = this.query;
      this.movieList = movies.results
    })
  }

  isFavoriteMovie(movieId: number): boolean {
    return this.userService.isFavorited(movieId);
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

}
