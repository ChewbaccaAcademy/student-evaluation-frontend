import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  private fullStudentsList: Student[];
  public isAdmin: boolean = false;

  constructor(private studentService: StudentService, private sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((value) => {
      this.students = value;
      this.fullStudentsList = value;
    });
    this.isAdmin = (this.authService.getSessionUserRole() === "ADMIN") ?  true : false;
  }

  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
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

  filterStudents(searchValue: string) {
    this.students = this.fullStudentsList.filter((student) => {
      return student.name
        .toLowerCase()
        .concat(' ' + student.lastname.toLowerCase())
        .includes(searchValue.toLowerCase());
    });
  }
  getUserDetails(student) {
    // Empty for deployment to work
  }
  evaluate(student){
    // Empty for deployment to work
  }

}
