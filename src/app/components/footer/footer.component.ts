import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  mybutton = document.getElementById("scrollButton");
  
  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  handleToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
