import { UserApiInterceptorService } from './../interceptors/user-api-interceptor.service';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from 'src/app/model/student';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private putAndPostHttpClient: HttpClient;
  private reqHeader: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Authorization': 'Bearer '+this.userApiInterceptorService.getSessionToken() });

  constructor(private httpClient: HttpClient, private httpBackend: HttpBackend, private userApiInterceptorService: UserApiInterceptorService) {
    this.putAndPostHttpClient = new HttpClient(httpBackend);
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${URL}/student`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${URL}/student/${studentId}`);
  }

  addStudent(student: FormData): Observable<Student> {
    return this.putAndPostHttpClient.post<Student>(`${URL}/student`, student, { headers: this.reqHeader });
  }

  updateStudent(student: Student): Observable<Student> {
    return this.putAndPostHttpClient.put<Student>(`${URL}/student/${student.id}`, student, { headers: this.reqHeader });
  }
}
