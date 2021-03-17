import { Router } from '@angular/router';
import { mapTo, catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  public errorMessage: boolean;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
      this.errorMessage = false;
      console.log("hello");

      //this.httpClient.post(this.apiURL + '/login', user, {headers:reqHeader, responseType: 'text'});

      this.httpClient.post('http://localhost:8080/authenticate',{email: email, password: password})
        .pipe(
          map(
          (res:Response) => (console.log(res))
          ), 
          //tap(value => console.log("tap" , value))
          tap (
            success => console.log('success'),
            error => console.log('error')
         )
        )
        .subscribe(
          value => {
          console.log("going to main menu" , value);
          this.router.navigate(["/main"]);
          }
        );  
      return of(this.errorMessage);
  }
}
