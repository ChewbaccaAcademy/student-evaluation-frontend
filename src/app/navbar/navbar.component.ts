import { UserApiInterceptorService } from './../services/interceptors/user-api-interceptor.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: MenuItem[];

  constructor(private router: Router, private userApiInterceptorService: UserApiInterceptorService) {}

  ngOnInit(): void {}

  logout(){
    this.userApiInterceptorService.removeSessionToken();
    this.router.navigate(['']);
  }
}
