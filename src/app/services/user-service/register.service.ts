import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mapTo } from 'rxjs/operators';
import { User } from 'src/app/model/user';

const LOCAL_URL: string = 'http://localhost:8080';
const HEROKU_URL: string = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private httpClient: HttpClient;
  constructor(private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient
      .post<User>(
        `${URL}/signup`,
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

const URL = 'https://team-three-backend.herokuapp.com';
