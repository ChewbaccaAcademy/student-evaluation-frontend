import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('inputFile')
  myInputVariable: ElementRef;
  imageSrc: string;
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
              RxwebValidators.alpha
            ]        
          }
        ],
        lastname: [
          '',
          {
            validators: [
              Validators.required,
              RxwebValidators.alpha
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
        file: ['', [RxwebValidators.extension({ extensions: ["png", "jpg", "jpeg"] }), RxwebValidators.fileSize({maxSize: 500000 }) ]],
        fileSource: [null]
      },

    );
}
  submitForm() {
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.set('student', new Blob([JSON.stringify(this.studentForm.value)], { type: "application/json" }));
      formData.set('image', JSON.stringify(this.studentForm.get('fileSource').value));
      console.log(formData);
      this.studentService.addStudent(formData).subscribe(
        () => this.toastr.success('Student was added', 'Success', { positionClass: 'toast-bottom-center', }),
        () => this.toastr.error('Student was not added. Check your inputs', 'Error', { positionClass: 'toast-bottom-center', })
      );
      this.studentForm.reset();
      this.myInputVariable.nativeElement.value = '';
      this.imageSrc = '';
    } else {
      this.toastr.error('Student was not added. Check your inputs', 'Error', { positionClass: 'toast-bottom-center', });
    }
  }
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      document.getElementById("uploadImg") .style.display = "inline";
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
  get file() {
    return this.studentForm.get('file');
  }

}
