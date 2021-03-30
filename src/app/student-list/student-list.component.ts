import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faAddressCard, faSortDown, faSortUp, faSort } from '@fortawesome/free-solid-svg-icons';

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
  public faSortDown =faSortDown;
  public faSortUp = faSortUp;
  public faSort = faSort;
  public feActive = false;
  public feValue: number;
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
  public faAddressCard = faAddressCard;
  public evaluationHeaders: {evaluationKey: string,
    name: string,
    key: string,
      }[] = [{
    evaluationKey: "averageEvaluationDetails.streamOverall.fe",
    name: "Frontend",
    key: "fe"
},
{
  evaluationKey: "averageEvaluationDetails.streamOverall.be",
  name: "Backend",
  key: "be"
},
{
  evaluationKey: "averageEvaluationDetails.streamOverall.qa",
  name: "Testing",
  key: "qa"
},
{
  evaluationKey: "averageEvaluationDetails.streamOverall.project",
  name: "Project",
  key: "project"
},
]
/*
    <th #fe scope="col" [appSort]="studentsList" data-order="-1"
              data-name="averageEvaluationDetails.streamOverall.fe" (click)="sorting('fe')">
               <a>
                <p class="text-center value unselectable">Frontend <fa-icon [icon]="!feActive ? faSort : (feValue == 1 ? faSortDown : faSortUp) " size="1x"></fa-icon></p>
              </a>
            </th>
            <th scope="col" [appSort]="studentsList" data-order="-1"
              data-name="averageEvaluationDetails.streamOverall.be">
              <a>
                <p class="text-center value unselectable">Backend</p>
              </a>
            </th>
            <th scope="col" [appSort]="studentsList" data-order="-1"
              data-name="averageEvaluationDetails.streamOverall.qa">
              <a>
                <p class="text-center value unselectable">Testing</p>
              </a>
            </th>
            <th scope="col" [appSort]="studentsList" data-order="-1"
              data-name="averageEvaluationDetails.streamOverall.project">
              <a>
                <p class="text-center value unselectable">Project</p>
              </a>
            </th>
*/
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

  sorting(value: string){
    if(value = "fe"){
      var element = document.getElementById('fe');
      this.feActive = true;
      this.feValue = +element.getAttribute('data-order');

    }

  }

  onSort(event: Event){
    console.log(event);
  }

}
