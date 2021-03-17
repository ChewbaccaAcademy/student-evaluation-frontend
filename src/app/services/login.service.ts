import { Router } from '@angular/router';
import { mapTo, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public errorMsg;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return of(this.httpClient.post(
      'http://localhost:8080/authenticate',
      {email: email, password: password}, 
      {headers:reqHeader, responseType: 'text'}
      ).subscribe(value => {
        console.log("value" , value);
        this.router.navigate(["/main"]);
      },
      err => {
        this.errorMsg = true;
      }));
}
}
