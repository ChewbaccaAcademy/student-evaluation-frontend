import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWindowFormComponent } from './main-window-form.component';

describe('MainWindowFormComponent', () => {
  let component: MainWindowFormComponent;
  let fixture: ComponentFixture<MainWindowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainWindowFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWindowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
