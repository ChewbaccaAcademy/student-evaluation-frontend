import { StudentService } from './../services/student-service/student.service';
import { SearchService } from './../services/search/search.service';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Student } from '../model/student';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  inputForm = new FormControl();
  resultStudentList$: Observable<Student[]>;
  query: string;

  constructor(
    private searchService: SearchService,
    public studentService: StudentService,
    private searchComponentRef: ElementRef,
  ) {}

  ngOnInit() {
    this.inputForm.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe((res) => {
      if (/^[a-zA-Z ]*$/.test(res)) {
        this.searchStudentSource(res);
      } else {
        this.searchStudentSource('');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this.searchComponentRef.nativeElement.contains(event.target)) {
      this.clearList();
    }
  }

  searchStudentSource(query: string): void {
    this.query = query;
    if (query.length > 2) {
      this.resultStudentList$ = this.searchService.searchStudent(query);
    } else {
      this.clearList();
    }
  }

  getStudentName(student: Student): string {
    const parts = this.query.split(' ').filter(part => !!part);
    let studentName = student.name + ' ' + student.lastname;
    parts.forEach(item => {
      const expression = new RegExp(item, 'ig');
      studentName = studentName.replace(expression, `<strong>${studentName.match(expression)[0]}</strong>`);
    });
    return studentName;
  }

  openStudent(): void {
    this.inputForm.setValue('');
    this.clearList();
  }

  private clearList(): void {
    this.resultStudentList$ = EMPTY;
  }
}
