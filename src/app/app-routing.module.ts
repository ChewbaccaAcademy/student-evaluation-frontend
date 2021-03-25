import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminGuard } from './guards/admin.guard';
import { EvaluateStudentComponent } from './evaluate-student/evaluate-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  {
    path: '', component: MainLayoutComponent, children:
      [{ path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
      { path: 'add', component: AddStudentFormComponent, canActivate: [AdminGuard] },
      { path: 'student/:id', component: StudentDetailsComponent, canActivate: [AuthGuard] },
      { path: 'evaluate', component: EvaluateStudentComponent, canActivate: [AuthGuard] },
      { path: 'evaluate/:id', component: EvaluateStudentComponent, canActivate: [AuthGuard] },
      ]
  },
  { path: '**', redirectTo: 'students' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
