import { StudentService } from './../services/student-service/student.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evaluation } from '../model/evaluation';
import { EvaluationStudent } from '../model/evaluation-student';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { streamOptions } from '../shared/evaluation-form-globals';
import { communicationOptions } from '../shared/evaluation-form-globals';
import { abilityToLearnOptions } from '../shared/evaluation-form-globals';
import { directionOptions } from '../shared/evaluation-form-globals';
import { overallEvaluationOptions } from '../shared/evaluation-form-globals';
import { Student } from '../model/student';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-evaluations',
  templateUrl: './user-evaluations.component.html',
  styleUrls: ['./user-evaluations.component.css'],
})
export class UserEvaluationsComponent implements OnInit {
  public userEvaluations: EvaluationStudent[];
  public streamOptions: string[] = streamOptions;
  public communicationOptions: string[] = communicationOptions;
  public abilityToLearnOptions: string[] = abilityToLearnOptions;
  public directionOptions: string[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;
  public evaluationTableHeaderNames: string[] = [
    'Photo',
    'Student',
    'Stream',
    'Overall evaluation',
    'Direction',
    'Communication',
    'Ability to learn',
    'Comment',
    'Action',
  ];

  constructor(
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.evaluationService.getAllUserEvaluationsStudent().subscribe((value) => {
      this.userEvaluations = value;
    });
  }

  updateValidation(evaluation: Evaluation) {}

  deleteValidation(evaluation: Evaluation, index: number) {
    this.evaluationService.deleteEvaluation(evaluation.id).subscribe(() => {
      this.userEvaluations.splice(index, 1);
      this.toastr.success('Evaluation was deleted', 'Success', { positionClass: 'toast-bottom-center' });
    });
  }

  getStudentImage(student: Student): SafeUrl {
    return this.studentService.getImage(student);
  }
}
