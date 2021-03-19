import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from '../services/user-service/model/user';
import { RegisterService } from '../services/user-service/register.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;
  public streamOptions: string[] = [
    'Select stream',
    'Frontend',
    'Backend',
    'Testing',
    'Project',
  ];

  constructor(private fb: FormBuilder, private location: Location, private toastr: ToastrService, private registerService: RegisterService) {}

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
          validators: [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
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
          Validators.maxLength(50),
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
    const user: User = { username: this.username.value,
                       password: this.password.value,
                       stream: this.stream.value,
                       email: this.email.value };
    this.registerService.registerUser(user).subscribe((response) => {
      if (response === true) {
        this.toastr.success( 'Successfully registered!', 'Success', { positionClass: 'toast-bottom-center', });
      } else {
        this.toastr.error(response, 'Error', { positionClass: 'toast-bottom-center', });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
