import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  private fullStudentsList: Student[];
  constructor(public studentService: StudentService) {}

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

  filterStudents(searchValue: string) {
    this.students = this.fullStudentsList.filter((student) => {
      return student.name
        .toLowerCase()
        .concat(' ' + student.lastname.toLowerCase())
        .includes(searchValue.toLowerCase());
    });
  }
}
