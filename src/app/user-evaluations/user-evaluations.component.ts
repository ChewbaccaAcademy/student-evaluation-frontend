import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Evaluation } from '../model/evaluation';
import { EvaluationStudent } from '../model/evaluation-student';
import { Student } from '../model/student';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { streamOptions } from '../shared/evaluation-form-globals';
import { communicationOptions } from '../shared/evaluation-form-globals';
import { abilityToLearnOptions } from '../shared/evaluation-form-globals';
import { directionOptions } from '../shared/evaluation-form-globals';
import { overallEvaluationOptions } from '../shared/evaluation-form-globals';

@Component({
  selector: 'app-user-evaluations',
  templateUrl: './user-evaluations.component.html',
  styleUrls: ['./user-evaluations.component.css'],
})
export class UserEvaluationsComponent implements OnInit {
  public userEvaluations: EvaluationStudent[];
  public streamOptions: string[] = streamOptions;
  public communicationOptions: { id: number; name: string }[] = communicationOptions;
  public abilityToLearnOptions: { id: number; name: string }[] = abilityToLearnOptions;
  public directionOptions: { id: number; name: string }[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;
  public evaluationTableHeaderNames: string[] =["Photo", "Student","Stream","Overall evaluation","Direction","Communication","Ability to learn","Comment","Action"];

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.evaluationService.getAllUserEvaluationsStudent().subscribe((value) => {
      this.userEvaluations = value;
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

  deleteValidation(evaluation: Evaluation, index: number) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.userEvaluations.splice(index, 1);
      this.toastr.success('Evaluation was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  editEvaluation(evaluationId: number, studentId: number) {
    this.router.navigate(['/evaluate'], { queryParams: { editStudent: studentId, edit: evaluationId } });
  }
}
