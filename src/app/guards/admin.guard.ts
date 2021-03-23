import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserApiInterceptorService } from '../services/interceptors/user-api-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private userApiInterceptorService: UserApiInterceptorService, private toastr: ToastrService,) {}

  canActivate() {
    if (this.userApiInterceptorService.getSessionToken() != null && this.userApiInterceptorService.getSessionUserRole() != "ADMIN"  ) {
      this.toastr.error('Only Admin can add students', 'Error', { positionClass: 'toast-bottom-center' });
      return false;
    }else if(this.userApiInterceptorService.getSessionToken() == null){
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }

}
