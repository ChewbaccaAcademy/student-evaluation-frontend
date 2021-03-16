import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public errorMessage: string;

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    this.httpClient.post<any>('http://localhost:8080/login', { email: email, password: password}).subscribe({
        next: _ => {},
        error: error => {
            this.errorMessage = error.message;
            console.error('Login failed !', error);
        }
    })
  }

}
