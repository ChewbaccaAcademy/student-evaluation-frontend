import { Student } from '../../model/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { URL } from '../../config';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {}

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${URL}/student`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>(`${URL}/student/${+studentId}`);
  }

  addStudent(student: FormData): Observable<Student> {
    return this.httpClient.post<Student>(`${URL}/student`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${URL}/student/${student.id}`, student);
  }

  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return './assets/images.jpg';
    }
  }
}
