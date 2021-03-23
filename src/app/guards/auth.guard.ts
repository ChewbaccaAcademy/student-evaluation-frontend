import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserApiInterceptorService } from '../services/interceptors/user-api-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userApiInterceptorService: UserApiInterceptorService) {}

  canActivate() {
    if (this.userApiInterceptorService.getSessionToken() == null) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
