import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student-service/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnInit {


  public studentForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private http: HttpClient, private studentService: StudentService) { }

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
            Validators.maxLength(250)
          ],
        ],
        file: ['',[ RxwebValidators.extension({extensions:["png","jpg","jpeg"]})]],
        fileSource: [null]
      },

    );
}
  submitForm() {
    const formData = new FormData();
    formData.append('student', new Blob([JSON.stringify(this.studentForm.value)], { type: "application/json" }));
    formData.append('image', new Blob([JSON.stringify(this.studentForm.get('fileSource').value)], { type: "application/json" }));
    this.studentService.addStudent(formData).subscribe(
      () => this.toastr.success( 'Student was added', 'Success', { positionClass: 'toast-bottom-center', }),
      () => this.toastr.error('Student was not added', 'Error', { positionClass: 'toast-bottom-center', })
    );
    
    this.studentForm.reset();
  }
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        fileSource: file
      });
    }
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
