import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public errorMessage: string;

  constructor(private httpClient: HttpClient) {}

  /*login(email: string, password: string) {
    this.httpClient.post<any>('http://localhost:8080/login', { email: email, password: password}).subscribe({
        next: _ => {},
        error: error => {
            this.errorMessage = error.message;
            console.error('Login failed !', error);
        }
    })
  }*/

  login(email: string, password: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    email = 'MrKrabs';
    password = 'MrKrabs';
    console.log({ username: email, password });
    return this.httpClient.post<any>('http://localhost:8080/authenticate', { username: email, password: password }, { headers, responseType: 'text' as 'json' });
  }

}
