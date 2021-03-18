import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface Student {
  id: number;
  name: string;
  lastname: string;
  university: string;
  comment: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  addStudent(student: FormData): Observable<Student> {
    return this.httpClient.post<Student>(
      'https://team-three-backend.herokuapp.com/student',
      student
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(
      'https://team-three-backend.herokuapp.com/student'
    );
  }
}
