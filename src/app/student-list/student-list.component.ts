import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  public studentsList: Student[];
  public faTrashAlt = faTrashAlt;
  public faClipboard = faClipboardList;
  public faEdit = faEdit;
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
  constructor(
    private studentService: StudentService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((value) => {
      this.studentsList = value;
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
    this.studentsList = this.fullStudentsList.filter((student) => {
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

  deleteStudent(studentId: number, index: number) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.studentsList.splice(index, 1);
      this.router.navigate(['/students']);
      this.toastr.success('Student was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }
}
