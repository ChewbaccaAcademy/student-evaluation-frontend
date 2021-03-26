import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { Evaluation } from '../model/evaluation';
import { EvaluationPost } from '../model/evaluationPost';
import { AuthService } from '../services/auth-service.service';
import domtoimage from 'dom-to-image';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student$: Observable<Student>;
  evaluationList$: Observable<Evaluation[]>;
  evaluationPost: EvaluationPost;
  studentId: number;

  public streamOptions: { id: number; name: string }[] = [
    { id: 0, name: 'FE' },
    { id: 1, name: `BE` },
    { id: 2, name: `QA` },
    { id: 3, name: `Project` },
  ];

  public communicationOptions: { id: number; name: string }[] = [
    { id: 0, name: 'Is active' },
    { id: 1, name: `Is passive` },
    { id: 2, name: `Communicative` },
    { id: 3, name: `Prefers written communication over verbal` },
  ];

  public learnAbilityOptions: { id: number; name: string }[] = [
    { id: 0, name: 'Is able to adapt to changing topics quickly' },
    { id: 1, name: `Doesn't understand but asks, tries to learn from mistakes` },
    { id: 2, name: `Doesn't understand and does nothing about it` },
  ];

  public directionOptions: { id: number; name: string }[] = [
    { id: 0, name: 'Java' },
    { id: 1, name: `Angular` },
    { id: 2, name: `Testing` },
    { id: 3, name: `Other` },
  ];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.studentId = +params.get('studentId');
      this.student$ = this.studentService.getStudentById(+this.studentId);
      this.loadEvaluations();
    });
  }

  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return './assets/images.jpg';
    }
  }

  loadEvaluations() {
    this.evaluationList$ = this.evaluationService.getAllStudentEvaluations(this.studentId);
  }

  isEvaluationDeletable(evaluation: Evaluation) {
    return this.auth.getSessionUserRole() === 'ADMIN' || evaluation.userId.toString() === this.auth.getSessionUserId();
  }

  deleteEvaluation(evaluation: Evaluation) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.loadEvaluations();
    });
  }

  exportCard(student: Student) {
    domtoimage.toBlob(document.getElementById('student-details')).then(function (blob) {
      FileSaver.saveAs(blob, `${student.name} ${student.lastname}.png`);
    });
  }
}
