import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public students: Student[];
  private fullStudentsList: Student[];
  public evaluationTableHeaderNames: string[] = [
    'Picture',
    'Student',
    'Backend',
    'Frontend',
    'Testing',
    'Project',
    'Action',
  ];
  constructor(private studentService: StudentService, private router: Router, private auth: AuthService) {}

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

  evaluateStudent(studentId: number) {
    this.router.navigate(['/evaluate'], { queryParams: { student: studentId } });
  }

  isAdmin() {
    return this.auth.getSessionUserRole() === 'ADMIN';
  }

  deleteStudent() {
    // this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
    //   this.loadEvaluations();
    // });
  }
}
