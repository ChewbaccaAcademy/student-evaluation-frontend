import { SearchService } from './../services/search/search.service';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  inputForm = new FormControl();
  resultStudentList: Array<Student | any>;

  constructor(
    private searchService: SearchService,
    private sanitizer: DomSanitizer,
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
      this.resultStudentList = null;
    }
  }

  searchStudentSource(query: string): void {
    if (query.length > 2) {
      this.enableSearch(query).subscribe((dataSource) => {
        this.doStudentSearch(dataSource);
      });
    } else {
      this.resultStudentList = null;
    }
  }

  enableSearch(value: string): Observable<Student[]> {
    return this.searchService.searchStudent(value);
  }

  private doStudentSearch(students: Array<Student>): void {
    this.resultStudentList = [];
    for (const student of students) {
      this.resultStudentList.push(student);
    }
  }

  getImage(student: Student) {
    if (student.image) {
      const objectURL = 'data:image/png;base64,' + student.image.imgByte;
      return this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      return './assets/images.jpg';
    }
  }

  openStudent(): void {
    this.inputForm.setValue('');
    this.resultStudentList = null;
  }
}
