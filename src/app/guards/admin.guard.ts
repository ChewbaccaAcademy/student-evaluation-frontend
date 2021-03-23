import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';
import { HttpRequestInterceptorService } from '../services/interceptors/http-request-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authServce: AuthService, private toastr: ToastrService) {}

  canActivate() {
    if (this.authServce.getSessionToken() != null && this.authServce.getSessionUserRole() != "ADMIN"  ) {
      this.toastr.error('Only Admin can add students', 'Error', { positionClass: 'toast-bottom-center' });
      return false;
    }else if(this.authServce.getSessionToken() == null){
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }

}
