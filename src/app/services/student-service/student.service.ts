import { Student } from '../../model/student';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service.service';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private putAndPostHttpClient: HttpClient;
  private reqHeader: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer ' + this.authService.getSessionToken() });

  constructor(private httpClient: HttpClient, private httpBackend: HttpBackend, private authService: AuthService) {
    this.putAndPostHttpClient = new HttpClient(httpBackend);
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${URL}/student`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${URL}/student/${studentId}`);
  }

  addStudent(student: FormData): Observable<Student> {
    return this.putAndPostHttpClient.post<Student>(`${URL}/student`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.putAndPostHttpClient.put<Student>(`${URL}/student/${student.id}`, student);
  }
}