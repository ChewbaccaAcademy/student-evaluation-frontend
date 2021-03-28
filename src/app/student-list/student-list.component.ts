import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth-service.service';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  private fullStudentsList: Student[];

  constructor(private studentService: StudentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((value) => {
      this.students = value;
      this.fullStudentsList = value;
    });
  }

  getImageTitle(student: Student) {
    if (student.image) {
      return student.image.name;
    } else {
      return 'noImage.jpg';
    }
  }
  getRole() {
    return this.authService.getSessionUserRole();
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }

  filterStudents(searchValue: string) {
    this.students = this.fullStudentsList.filter((student) => {
      return student.name
        .toLowerCase()
        .concat(' ' + student.lastname.toLowerCase())
        .includes(searchValue.toLowerCase());
    });
  }
}
