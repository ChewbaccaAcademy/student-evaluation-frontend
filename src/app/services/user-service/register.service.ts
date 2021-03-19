import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mapTo } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient
      .post<User>(
        `${URL}/authenticate`,
        {
          username: user.username,
          password: user.password,
          stream: user.stream.toUpperCase(),
          email: user.email,
        },
        { headers, responseType: 'text' as 'json' },
      )
      .pipe(
        mapTo(true),
        catchError((error) => {
          return of(JSON.parse(error.error).message);
        }),
      );
  }
}

const URL = 'https://team-three-backend.herokuapp.com/';
