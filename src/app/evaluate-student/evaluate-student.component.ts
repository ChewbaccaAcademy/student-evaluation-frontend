import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from '../services/student-service/student.service';
import { EvaluationService } from '../services/evaluation/evaluation.service';
import { Student } from '../model/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public directionOptions: { id: number; name: string }[] = [
    { id: 0, name: 'Java' },
    { id: 1, name: `Angular` },
    { id: 2, name: `Testing` },
    { id: 3, name: `Other` },
  ];
  public overallEvaluationOptions: string[] = [
    `1 – not suitable`,
    `2 – not so good `,
    `3 – potential to grow`,
    `4 – strong growth`,
    `5 – motivated, really good`,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private evaluationService: EvaluationService,
  ) {}

  ngOnInit(): void {
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

    this.students = this.studentService.getAllStudents();
  }

  submitForm() {
    if (this.evaluationForm.valid) {
      this.evaluationService.addEvaluation(this.student.value, this.evaluationForm.value);
    }
    console.log(this.evaluationForm);
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
