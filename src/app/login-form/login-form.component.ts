import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: [
          '',
          {
            validators: [
              Validators.required,
            ],
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

onSubmit() {
  console.log(this.loginForm.value);
}

}
