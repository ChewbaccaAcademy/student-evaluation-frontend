import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../services/student-service/evaluation/evaluation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvaluationPost } from '../model/evaluationPost';

@Component({
  selector: 'app-evaluate-student',
  templateUrl: './evaluate-student.component.html',
  styleUrls: ['./evaluate-student.component.css'],
})
export class EvaluateStudentComponent implements OnInit {
  students: Observable<Student[]>;

  public evaluationForm: FormGroup;
  public streamOptions: string[] = ['FE', 'BE', 'QA', 'Project'];
  public communicationOptions: string[] = [
    `Is active, communicative`,
    `Is passive`,
    `Prefers written communication over verbal`,
  ];
  public abilityToLearnOptions: string[] = [
    `Is able to adapt to changing topics quickly`,
    `Doesn't understand and does nothing about it`,
    `Doesn't understand but asks, tries to learn from mistakes`,
  ];

  public directionOptions: string[] = ['Java', 'Angular', 'Testing', 'Other'];

  public overallEvaluationOptions: { id: number; name: string }[] = [
    { id: 1, name: '1 – not suitable' },
    { id: 2, name: `2 – not so good` },
    { id: 3, name: `3 – potential to grow` },
    { id: 4, name: `4 – strong growth` },
    { id: 5, name: `5 – motivated, really good` },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {

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

  }

  submitForm() {
    const studentEvaluationForm: EvaluationPost = {
      stream: this.stream.value,
      communication: this.communication.value,
      learnAbility: this.abilityToLearn.value,
      direction: this.direction.value,
      evaluation: this.overallEvaluation.value,
      comment: this.comment.value,
    };

    this.evaluationService.postEvaluation(this.student.value, studentEvaluationForm).subscribe((response) => {
      if (response === true) {
          this.toastr.success('Evaluation was successfully submited!', 'Success', { positionClass: 'toast-bottom-center' });
          this.router.navigate(['/main']);
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
