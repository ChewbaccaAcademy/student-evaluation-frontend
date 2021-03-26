import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../model/student';
import { StudentService } from '../services/student-service/student.service';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css'],
})
export class AddStudentFormComponent implements OnInit {
  @ViewChild('inputFile')
  myInputVariable: ElementRef;
  imageSrc: SafeUrl = '/assets/imgnotfound.png';
  editMode: boolean = false;
  studentId: number;
  student$: Observable<Student>;

  public studentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
     this.studentForm = this.formBuilder.group({
      name: [
        '',
        {
          validators: [Validators.required, RxwebValidators.alpha()],
        },
      ],
      lastname: [
        '',
        {
          validators: [Validators.required, RxwebValidators.alpha()],
        },
      ],
      university: [''],
      comment: ['', [Validators.maxLength(250)]],
      file: [
        '',
        [
          RxwebValidators.extension({ extensions: ['png', 'jpg', 'jpeg'] }),
          RxwebValidators.fileSize({ maxSize: 500000 }),
        ],
      ],
      fileSource: [null],
    });
    this.activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('studentId'))).subscribe(value => {
      this.studentId = +value;
      this.loadStudent();
    }, () => {

      
    }, () => { this.loadStudent() });
    
  
    console.log(  this.studentId);
    console.log(this.editMode);
    console.log(this.imageSrc);
   

  }
  submitForm() {
    console.log("submit");
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.append('student', new Blob([JSON.stringify(this.studentForm.value)], { type: 'application/json' }));
      formData.append('image', this.studentForm.get('fileSource').value);
      this.studentService.addStudent(formData).subscribe(
        () => {
          this.toastr.success('Student was added', 'Success', { positionClass: 'toast-bottom-center' });
          this.studentForm.reset();
          this.myInputVariable.nativeElement.value = '';
          this.imageSrc = '/assets/imgnotfound.png';
        },
        () => this.toastr.error('Student was not added', 'Error', { positionClass: 'toast-bottom-center' }),
      );
    } else {
      this.toastr.error('Student was not added. Check your inputs', 'Error', { positionClass: 'toast-bottom-center' });
    }
  }

  updateStudent() {
    console.log("update");
    if (this.studentForm.valid) {
      const formData = new FormData();
      formData.append('student', new Blob([JSON.stringify(this.studentForm.value)], { type: 'application/json' }));
      if(this.studentForm.get('fileSource').value != null)
        formData.append('image', this.studentForm.get('fileSource').value);
      this.studentService.updateStudent(formData, this.studentId).subscribe(
        () => {
          this.toastr.success('Student was updated', 'Success', { positionClass: 'toast-bottom-center' });
          this.studentForm.reset();
          this.myInputVariable.nativeElement.value = '';
          this.imageSrc = '/assets/imgnotfound.png';
        },
        () => this.toastr.error('Student was not update', 'Error', { positionClass: 'toast-bottom-center' }),
      );
    } else {
      this.toastr.error('Student was not updated. Check your inputs', 'Error', { positionClass: 'toast-bottom-center' });
    }
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.studentForm.patchValue({
        fileSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        console.log(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearPhoto() {
    this.imageSrc = '/assets/imgnotfound.png';
    this.myInputVariable.nativeElement.value = '';
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
  loadStudent() {
      if (this.studentId != 0) {
      this.editMode = true;
      this.studentService.getStudentById(this.studentId).subscribe((student) => {
        this.studentForm.get('name').setValue(student.name);
        this.studentForm.get('lastname').setValue(student.lastname);
        this.studentForm.get('university').setValue(student.university);
        this.studentForm.get('comment').setValue(student.comment);
        
      });
        
      

    }
    
  }




  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return './assets/images.jpg';
    }
  }
}
