import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public setSessionToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getSessionToken(): string {
    return localStorage.getItem('token');
  }

  public removeSessionToken() {
    localStorage.removeItem('token');
  }
}
