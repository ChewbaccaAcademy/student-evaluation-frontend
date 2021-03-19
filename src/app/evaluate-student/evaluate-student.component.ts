import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student-service/student.service';
import { Student } from '../model/student';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evaluate-student',
  templateUrl: './evaluate-student.component.html',
  styleUrls: ['./evaluate-student.component.css'],
})
export class EvaluateStudentComponent implements OnInit {
  students: Observable<Student[]>;

  public evaluationForm: FormGroup;
  public streamOptions: String[] = ['FE', 'BE', 'QA', 'Project'];
  public communicationOptions: String[] = [
    `Is active, communicative`,
    `Is passive`,
    `Prefers written communication over verbal`,
  ];
  public abilityToLearnOptions: String[] = [
    `Is able to adapt to changing topics quickly`,
    `Doesn't understand and does nothing about it`,
    `Doesn't understand but asks, tries to learn from mistakes`,
  ];
  public directionOptions: String[] = [`Java`, `Angular`, `Testing`, `Other`];
  public overallEvaluationOptions: String[] = [
    `1 – not suitable`,
    `2 – not so good `,
    `3 – potential to grow`,
    `4 – strong growth`,
    `5 – motivated, really good`,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.evaluationForm = this.formBuilder.group({
      student: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      stream: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      communication: [''],
      abilityToLearn: [''],
      direction: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      overallEvaluation: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      comment: [
        '',
        {
          validators: [Validators.maxLength(250)],
        },
      ],
    });

    this.students = this.studentService
      .getAllStudents();
  }

  submitForm() {
    if (this.evaluationForm.valid) {
      this.studentService.addEvaluation(this.evaluationForm.value);
      // .subscribe(
      //   () =>
      //     this.toastr.success('Evaluation was added', 'Success', {
      //       positionClass: 'toast-bottom-center',
      //     }),
      //   () =>
      //     this.toastr.error('Evaluation was not added', 'Error', {
      //       positionClass: 'toast-bottom-center',
      //     })
      // );

      this.evaluationForm.reset();
    } else {
      this.toastr.error(
        'Evaluation was not added. Check your inputs',
        'Error',
        { positionClass: 'toast-bottom-center' }
      );
    }
  }

  get student() {
    return this.evaluationForm.get('student');
  }
  get stream() {
    return this.evaluationForm.get('steram');
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
