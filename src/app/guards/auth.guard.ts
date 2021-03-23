import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { HttpRequestInterceptorService } from '../services/interceptors/http-request-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.getSessionToken() == null) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

}
