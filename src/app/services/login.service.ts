import { Router } from '@angular/router';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpRequestInterceptorService } from './interceptors/http-request-interceptor.service';
import { AuthService } from './auth-service.service';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public errorMsg: BehaviorSubject<string> = new BehaviorSubject('');
  private httpClient: HttpClient;

  constructor(private httpBackend: HttpBackend, private router: Router, private authService: AuthService) {
    this.httpClient = new HttpClient(httpBackend);
  }

  login(email: string, password: string): void {
    this.errorMsg.next('');
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient
      .post(`${URL}/authenticate`, { email: email, password: password }, { headers: reqHeader, responseType: 'text' })
      .subscribe(
        (sd) => {
          this.authService.setAuthData(JSON.parse(sd));
          this.router.navigate(['/main']);
        },
        (error) => {
          this.errorMsg.next(JSON.parse(error.error).message);
        },
      );
  }

  logout(): void {
    this.authService.removeAuthData();
    this.router.navigate(['login']);
  }
}
