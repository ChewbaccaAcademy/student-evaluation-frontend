import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { Evaluation } from 'src/app/model/evaluation';
import { EvaluationPost } from 'src/app/model/evaluationPost';
import { AuthService } from '../../auth-service.service';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation`);
  }

  getAllUserEvaluations(userId: number): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation/user/${userId}`);
  }

  getAllStudentEvaluations(studentId: number): Observable<Evaluation[]> {
    return this.httpClient.get<Evaluation[]>(`${URL}/student/evaluation/${studentId}`);
  }

  postEvaluation(studentId: number, evaluation: EvaluationPost): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient
      .post<Evaluation>(`${URL}/student/evaluation/${studentId}`, evaluation, {
        headers,
        responseType: 'text' as 'json',
      })
      .pipe(
        mapTo(true),
        catchError((error) => {
          return of(JSON.parse(error.error).message);
        }),
      );
  }

  updateEvaluation(studentId: number, evaluationId: number, evaluation: EvaluationPost): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`${URL}/student/evaluation/${studentId}/${evaluationId}`, evaluation);
  }

  deleteEvaluation(evaluationId: number): Observable<any> {
    return this.httpClient.put(`${URL}/student/evaluation/${evaluationId}`, evaluationId);
  }
}
