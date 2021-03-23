import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  public isAdmin: boolean = false;

  constructor(private loginService: LoginService, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.getSessionUserRole() === "ADMIN"){
      this.isAdmin = true;
    }

  }

  logout() {
    this.loginService.logout();
  }
}
