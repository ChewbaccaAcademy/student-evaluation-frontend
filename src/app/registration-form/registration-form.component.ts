import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;
  public streamOptions: String[] = [
    'Select stream',
    'Frontend',
    'Backend',
    'Testing',
    'Project',
    'Administration',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40),
          ],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern('^\\S+@\\S+$')],
          updateOn: 'blur',
        },
      ],
      stream: [
        'Select stream',
        [Validators.required, Validators.pattern('^((?!Select stream).)*$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
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
  submitForm() {
    console.log(this.registrationForm.value);
  }
}
