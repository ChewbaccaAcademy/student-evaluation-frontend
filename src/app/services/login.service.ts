import { Router } from '@angular/router';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiInterceptorService } from './interceptors/user-api-interceptor.service';
import { ToastrService } from 'ngx-toastr';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public errorMsg: BehaviorSubject<string> = new BehaviorSubject('');
  private httpClient: HttpClient;

  constructor(
    private httpBackend: HttpBackend,
    private router: Router,
    private userApiInterceptorService: UserApiInterceptorService,
    private toastr: ToastrService,
  ) {
    this.httpClient = new HttpClient(httpBackend);
  }

  login(email: string, password: string): void {
    this.errorMsg.next('');
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient
      .post(`${URL}/authenticate`, { email: email, password: password }, { headers: reqHeader, responseType: 'text' })
      .subscribe(
        (sd) => {
          this.userApiInterceptorService.setAuthData(JSON.parse(sd));
          this.router.navigate(['/students']);
        },
        (error) => {
          this.toastr.error(JSON.parse(error.error).message, 'Error', {
            positionClass: 'toast-bottom-center',
            timeOut: 2500,
          });
          this.errorMsg.next(JSON.parse(error.error).message);
        },
      );
  }

  logout(): void {
    this.userApiInterceptorService.removeAuthData();
    this.router.navigate(['login']);
  }
}
