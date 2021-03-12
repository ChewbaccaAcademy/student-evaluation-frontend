import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnInit {


  public studentForm : FormGroup;
  constructor(private formBuilder: FormBuilder) { }

ngOnInit() {
    this.studentForm = this.formBuilder.group(
      {
        name: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern('^[A-Za-z ]*$'),
            ]        
          }
        ],
        lastname: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern('^[A-Za-z ]*$'),
            ]        
          }
        ]
        ,
        university: [''],
        comment: [
          '',
          [
            Validators.maxLength(10)
          ],
        ],
      },

    );
}
  submitForm() {
    console.log(this.studentForm.value);
    this.studentForm.reset();
  }

  get name() {
    return this.studentForm.get('name');
  }
  get lastname() {
    return this.studentForm.get('lastname');
   }
  get university() {
    return this.studentForm.get('university');
   }
  get comment() {
    return this.studentForm.get('comment');
  }

}
