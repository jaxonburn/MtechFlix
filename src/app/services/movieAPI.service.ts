import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MovieAPIService {

  
  constructor(
    private http: HttpClient
  ) { }

  getMoviesObservable(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=7db7712f35a0538299ca87321d19cda6&language=en-US&page=1');
  }

  searchMovie(query): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=7db7712f35a0538299ca87321d19cda6&language=en-US&query=${query}&page=1&include_adult=false`);
  }
  getMovieById(id): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7db7712f35a0538299ca87321d19cda6&language=en-US`);
  }
}
