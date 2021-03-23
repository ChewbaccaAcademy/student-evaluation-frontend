import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: MenuItem[];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
  }
}
