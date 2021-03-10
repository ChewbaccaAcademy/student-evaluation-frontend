import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [
        '',
        {
          validators: [Validators.required, Validators.pattern('^[A-Za-z ]*$')],
          updateOn: 'blur',
          //asyncValidators: [blockedAuthorValidator(this.postService)],
        },
      ],
      email: ['', [Validators.required]],
      stream: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          // Validators.maxLength(this.maxContent),
          // explicitValidator,
        ],
      ],
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get stream() {
    return this.registrationForm.get('stream');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  submitForm() {}
}
