import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageData } from 'src/app/shared/local-storage-data';

@Injectable({
  providedIn: 'root',
})
export class UserApiInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getSessionToken(),
      }),
    });
    return next.handle(authReq);
  }

  public setAuthData(authData: LocalStorageData) {
    localStorage.setItem('token', authData.jwt);
    localStorage.setItem('tokenExpirationDate', authData.date.toString());
    localStorage.setItem('userRole', authData.role[0]);
    localStorage.setItem('userId', authData.userId.toString());

  }

  public getSessionToken(): string {
    return localStorage.getItem('token');
  }

  public getSessionExpirationDate(): string {
    return localStorage.getItem('tokenExpirationDate');
  }

  public getSessionUserRole(): string {
    return localStorage.getItem('userRole');
  }

  public getSessionUserId(): string {
    return localStorage.getItem('userId');
  }


  public removeAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
}
