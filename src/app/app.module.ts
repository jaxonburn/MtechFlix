
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieSearchComponent } from "./components/movie-search/movie-search.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

import { LoginPageComponent } from "./components/login-page/login-page.component";
import { environment } from "src/environments/environment";
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { NgxAuthFirebaseUIModule } from "ngx-auth-firebaseui";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule } from '@angular/material/slider'
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { RatingModule } from "ng-starrating";
import { MovieDetailComponent } from "./components/movie-detail/movie-detail.component";
import { UserMoviesComponent } from './components/user-movies/user-movies.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    MovieDetailComponent,
    UserMoviesComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPasswordStrengthModule,
    NgxAuthFirebaseUIModule.forRoot(
      environment.firebase,
      () => "your_app_name_factory",
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: false, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: "/", // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: "/movie", // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true // default: true
      }
    ),
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    RatingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }