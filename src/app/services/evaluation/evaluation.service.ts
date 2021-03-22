import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Evaluation } from '../../model/evaluation';
import { EvaluationPost } from '../../model/evaluationPost';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  public errorMsg: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation`);
  }

  getAllUserEvaluations(userId: number): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation/user/${userId}`);
  }

  getAllStudentEvaluations(studentId: number): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation/${studentId}`);
  }

  postEvaluation(studentId: number, evaluation: EvaluationPost): Observable<Evaluation> {
    return this.httpClient.post<Evaluation>(`${URL}/student/evaluation/${studentId}`, evaluation);
  }

  addEvaluation(studentId: number, evaluation: EvaluationPost): void {
    this.httpClient.post<Evaluation>(`${URL}/student/evaluation/${studentId}`, evaluation).subscribe(
      () => {
        this.router.navigate(['/main']);
      },
      (error) => {
        this.errorMsg.next(JSON.parse(error.error).message);
      },
    );
  }

  updateEvaluation(studentId: number, evaluationId: number, evaluation: EvaluationPost): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`${URL}/student/evaluation/${studentId}/${evaluationId}`, evaluation);
  }
}
