import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { Evaluation } from '../model/evaluation';
import { AuthService } from '../services/auth-service.service';
import domtoimage from 'dom-to-image';
import * as FileSaver from 'file-saver';
import { streamOptions } from '../shared/evaluation-form-globals';
import { communicationOptions } from '../shared/evaluation-form-globals';
import { abilityToLearnOptions } from '../shared/evaluation-form-globals';
import { directionOptions } from '../shared/evaluation-form-globals';
import { overallEvaluationOptions } from '../shared/evaluation-form-globals';

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
