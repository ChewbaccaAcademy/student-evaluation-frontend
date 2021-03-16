import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public loginError: string;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

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
  return this.loginError;
}

onSubmit() {
  console.log(this.loginForm.value);
}
onLogin() {
  this.loginService.login(this.email.value, this.password.value);
  this.loginError = this.loginService.errorMessage;
}
}
