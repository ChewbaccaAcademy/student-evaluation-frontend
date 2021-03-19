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
        path: '/link1',
        title: 'Link 1',
      },
      {
        path: '/link1',
        title: 'Link 2',
      },
      {
        path: '/link1',
        title: 'Link 3',
      },
      {
        path: '/link1',
        title: 'Link 4',
      },
      {
        path: '/link1',
        title: 'Link 5',
      },
    ];
  }

  title = 'student-evaluation-frontend';
}
