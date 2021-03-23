import { Student } from './../user-service/model/student';
import { UserApiInterceptorService } from './../interceptors/user-api-interceptor.service';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const URL = 'https://team-three-backend.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private httpClient: HttpClient;
  private reqHeader: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.userApiInterceptorService.getSessionToken(),
  });

  constructor(private httpBackend: HttpBackend, private userApiInterceptorService: UserApiInterceptorService) {
    this.httpClient = new HttpClient(httpBackend);
  }

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${URL}/student`, { headers: this.reqHeader });
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${URL}/student/${studentId}`, { headers: this.reqHeader });
  }

  addStudent(student: FormData): Observable<Student> {
    return this.httpClient.post<Student>(`${URL}/student`, student, { headers: this.reqHeader });
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${URL}/student/${student.id}`, student, { headers: this.reqHeader });
  }
}
