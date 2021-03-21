import { Component, OnInit } from '@angular/core';
import { MenuItem } from './shared/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public menuItems: MenuItem[];

  ngOnInit(): void {
    this.menuItems = [
      {
        path: '/main',
        title: 'Main',
      },
      {
        path: '/students',
        title: 'All Students',
      },
    ];
  }

  title = 'student-evaluation-frontend';
}
