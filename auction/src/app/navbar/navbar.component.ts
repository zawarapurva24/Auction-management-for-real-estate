import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../alert/alert.service';
import { SearchService } from './search.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public auctions = [];
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }
  isLoggedIn() {
    return this.auth.isLoggedIn;
  }
  ngOnInit() {
  }

  search(event) {
    console.log(event.target.text);
    return this.router.navigate(['/home'], { queryParams: { property_type: event.target.text } });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
