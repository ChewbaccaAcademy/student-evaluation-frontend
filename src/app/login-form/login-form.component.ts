import { Observable, of, throwError } from 'rxjs';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  //public loginError: string;

  public errorMsg: Observable<string>;
  public token = 'asd';
  public kk: Observable<string>;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: [
          '',
          {
            validators: [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          {
            validators: [
              Validators.required,
            ],
          },
        ]   
  });
}

get email() {
  return this.loginForm.controls['email'];
}

get password() {
  return this.loginForm.controls['password'];
}

get errorMessage() {
  return this.errorMsg;
}

onSubmit() {
  //console.log(this.loginForm.value);
}
/*onLogin() {
  this.loginService.login(this.email.value, this.password.value);
  this.loginError = this.loginService.errorMessage;
}*/

onLogin() {
  this.kk = this.loginService.login(this.email.value, this.password.value).pipe(catchError(error => {
    console.log(JSON.parse(error.error).message);
    return of(null);
  }));

  //this.router.navigate(['add']);
  //this.loginService.login(this.email.value, this.password.value).subscribe((result) => this.token = result);
}
}
