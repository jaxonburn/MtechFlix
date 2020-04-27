import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public movieService: MovieService,
    private router: Router
  ) { }
    homeRoute(){
      if(window.innerWidth >= 500){
        this.router.navigateByUrl('/movie');
      }
      
    }
    

  ngOnInit(): void {
  }

}
