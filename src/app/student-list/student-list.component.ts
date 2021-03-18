import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../services/user-service/model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  private fullStudentsList: Student[];
  
  constructor(
    private studentService: StudentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((value) => {
      this.students = value;
      this.fullStudentsList = value;
    });
  }

  getImage(student: Student) {
    if (student.image) {
      let objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return './assets/images.jpg';
    }
  }
  getImageTitle(student: Student) {
    if (student.image) {
      return student.image.name;
    } else {
      return 'noImage.jpg';
    }
  }
  getUserDetails(student: Student) {}
  evaluate(student: Student) {}

  filterStudents(searchValue: string) {
    this.students = this.fullStudentsList.filter((student) => {
      return student.name
        .toLowerCase()
        .concat(' ' + student.lastname.toLowerCase())
        .includes(searchValue.toLowerCase());
    });
  }
}