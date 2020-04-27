import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "movie-detail/:id", component: MovieDetailComponent },
  { path: "login", component: LoginPageComponent },
  {
    path: "movie", component: MovieSearchComponent
  },
  { path: "user-movies", component: UserMoviesComponent },
  { path: "user-profile", component: UserProfileComponent,
    canActivate: [LoggedInGuard] },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
