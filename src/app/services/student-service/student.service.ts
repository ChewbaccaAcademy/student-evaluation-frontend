import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface Student {
  id: number;
  name: string;
  lastname: string;
  university: string;
  comment: string;
  evaluation: StudentEvaluation;
  imageUrl?: string;
}

interface StudentEvaluation {
  Frontend: number;
  Backend: number;
  Testing: number;
  Project: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  addStudent(student: FormData): Observable<Student> {
    return this.httpClient.post<Student>(
      'https://team-three-backend.herokuapp.com/api/student',
      student
    );
  }

}
