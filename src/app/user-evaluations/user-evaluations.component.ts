import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Evaluation } from '../model/evaluation';
import { EvaluationStudent } from '../model/evaluation-student';
import { Student } from '../model/student';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import * as evaluationFormGlobals from '../shared/evaluation-form-globals';

@Component({
  selector: 'app-user-evaluations',
  templateUrl: './user-evaluations.component.html',
  styleUrls: ['./user-evaluations.component.css'],
})
export class UserEvaluationsComponent implements OnInit {
  public userEvaluations: EvaluationStudent[];
  public streamOptions: string[] = evaluationFormGlobals.streamOptions;
  public communicationOptions: string[] = evaluationFormGlobals.communicationOptions;
  public abilityToLearnOptions: string[] = evaluationFormGlobals.abilityToLearnOptions;
  public directionOptions: string[] = evaluationFormGlobals.directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = evaluationFormGlobals.overallEvaluationOptions;
  public evaluationTableHeaderNames: string[] =["Photo", "Student","Stream","Overal evaluation","Direction","Communication","Ability to learn","Comment","Action"];

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
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

  updateValidation(evaluation: Evaluation) {}

  deleteValidation(evaluation: Evaluation, index: number) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.userEvaluations.splice(index, 1);
      this.toastr.success('Evaluation was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }
}
