import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'https://team-three-backend.herokuapp.com';

interface EvaluationPost {
  id: number;
  stream?: number;
  communication?: number;
  learnAbility?: number;
  direction?: number;
  evaluation: number;
  comment?: string;
  isActive?: boolean;
}

interface Evaluation {
  id: number;
  stream?: string;
  communication?: string;
  learnAbility?: string;
  direction?: string;
  evaluation: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) {
  }

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

  updateEvaluation(studentId: number, evaluationId: number, evaluation: EvaluationPost): Observable<Evaluation> {
    return this.httpClient.put<Evaluation>(`${URL}/student/evaluation/${studentId}/${evaluationId}`, evaluation);
  }
}
