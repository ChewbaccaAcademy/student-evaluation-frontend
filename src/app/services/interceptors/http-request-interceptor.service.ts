import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorization = 'Bearer ' + this.authService.getSessionToken();
    const putHeader = req.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: authorization,
      }),
    });
    const authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authorization,
      }),
    });

    if ((req.method == 'PUT' || req.method == 'POST') && req.url.match('/student')) {
      return next.handle(putHeader);
    }
    return next.handle(authReq);
  }
}
