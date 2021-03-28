import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvaluationPost } from '../model/evaluationPost';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { streamOptions } from '../shared/evaluation-form-globals'
import {
  communicationOptions,
  abilityToLearnOptions,
  directionOptions,
  overallEvaluationOptions,
} from '../shared/evaluation-form-globals';


@Component({
  selector: 'app-evaluate-student',
  templateUrl: './evaluate-student.component.html',
  styleUrls: ['./evaluate-student.component.css'],
})
export class EvaluateStudentComponent implements OnInit {
  students: Observable<Student[]>;
  returnObject$: Observable<any>;
  isSingleStudent: boolean;
  studentId: number;

  public evaluationForm: FormGroup;
  public streamOptions: string[] = streamOptions;
  public communicationOptions: string[] = communicationOptions;
  public abilityToLearnOptions: string[] = abilityToLearnOptions;
  public directionOptions: string[] = directionOptions;
  public overallEvaluationOptions: { id: number; name: string }[] = overallEvaluationOptions;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('studentId'))).subscribe((value) => {
      this.studentId = +value;
    });

    this.students = this.studentService.getAllStudents();

    this.evaluationForm = this.formBuilder.group({
      student: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      stream: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      communication: [''],
      abilityToLearn: [''],
      direction: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      overallEvaluation: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      comment: [
        '',
        {
          validators: [Validators.maxLength(250)],
        },
      ],
    });

    if (this.studentId) {
      this.student.setValue(this.studentId);
      this.student.disable();
    }
  }

  submitForm() {
    const studentEvaluationForm: EvaluationPost = {
      stream: this.stream.value,
      communication: this.communication.value || undefined,
      learnAbility: this.abilityToLearn.value || undefined,
      direction: this.direction.value,
      evaluation: this.overallEvaluation.value,
      comment: this.comment.value,
    };

    this.evaluationService.postEvaluation(this.student.value, studentEvaluationForm).subscribe((response) => {
      if (response) {
        this.toastr.success('Evaluation was successfully submited!', 'Success', {
          positionClass: 'toast-bottom-center',
        });
        if (this.studentId) {
          this.router.navigate([`/student/${this.studentId}`]);
        } else {
          this.router.navigate(['/main']);
        }
      } else {
        this.toastr.error('Please check your input fields', 'Error', { positionClass: 'toast-bottom-center' });
      }
    });
  }

  get student() {
    return this.evaluationForm.get('student');
  }
  get stream() {
    return this.evaluationForm.get('stream');
  }
  get communication() {
    return this.evaluationForm.get('communication');
  }
  get abilityToLearn() {
    return this.evaluationForm.get('abilityToLearn');
  }
  get direction() {
    return this.evaluationForm.get('direction');
  }
  get overallEvaluation() {
    return this.evaluationForm.get('overallEvaluation');
  }
  get comment() {
    return this.evaluationForm.get('comment');
  }
}
