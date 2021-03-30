import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { forkJoin, Observable, of } from 'rxjs';
import { ParamMap } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { Evaluation } from '../model/evaluation';
import { AuthService } from '../services/auth-service.service';
import domtoimage from 'dom-to-image';
import * as FileSaver from 'file-saver';
import {
  streamOptions,
  communicationOptions,
  abilityToLearnOptions,
  directionOptions,
  overallEvaluationOptions,
} from '../shared/evaluation-form-globals';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student$: Observable<Student>;
  evaluationList$: Observable<Evaluation[]>;
  studentId: number;
  public streamOptions: string[] = streamOptions;
  public communicationOptions: { id: number; name: string }[] = communicationOptions;
  public abilityToLearnOptions: { id: number; name: string }[] = abilityToLearnOptions;
  public directionOptions: { id: number; name: string }[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;
  public faTrashAlt = faTrashAlt;
  public faAddressCard = faAddressCard;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.studentId = +params.get('studentId');
      forkJoin([
        this.studentService.getStudentById(+this.studentId),
        this.evaluationService.getAllStudentEvaluations(this.studentId),
      ]).subscribe(([student, evaluations]) => {
        this.student$ = of(student);
        this.evaluationList$ = of(evaluations);
      });
    });
  }

  isEvaluationDeletable(evaluation: Evaluation) {
    return this.auth.getSessionUserRole() === 'ADMIN' || evaluation.userId.toString() === this.auth.getSessionUserId();
  }

  deleteEvaluation(evaluation: Evaluation) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.evaluationList$ = this.evaluationService.getAllStudentEvaluations(this.studentId);
    });
  }

  exportCard(student: Student) {
    domtoimage.toBlob(document.getElementById('student-details')).then(function (blob) {
      FileSaver.saveAs(blob, `${student.name} ${student.lastname}.png`);
    });
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }
}
