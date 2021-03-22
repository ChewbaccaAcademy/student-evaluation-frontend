import { UserApiInterceptorService } from './../interceptors/user-api-interceptor.service';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const URL = 'https://team-three-backend.herokuapp.com';

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
  private httpClient: HttpClient;

  constructor(private httpBackend: HttpBackend, private userApiInterceptorService: UserApiInterceptorService) {
    this.httpClient = new HttpClient(httpBackend);
  }

  addStudent(student: FormData): Observable<Student> {
    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer '+this.userApiInterceptorService.getSessionToken() });
    return this.httpClient.post<Student>(`${URL}/student`, student, { headers: reqHeader });
  }

  getAllStudents(): Observable<Student[]> {
    const reqHeader = new HttpHeaders({ 'Authorization': 'Bearer '+this.userApiInterceptorService.getSessionToken() });
    return this.httpClient.get<Student[]>(`${URL}/student`, { headers: reqHeader });
  }
}
