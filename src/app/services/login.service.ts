import { Router } from '@angular/router';
import { mapTo, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public errorMsg: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): void {
    this.errorMsg.next('');
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient
      .post(`${URL}/authenticate`, { email: email, password: password }, { headers: reqHeader, responseType: 'text' })
      .subscribe(
        () => {
          this.router.navigate(['/main']);
        },
        (error) => {
          this.errorMsg.next(JSON.parse(error.error).message);
        },
      );
  }
}
