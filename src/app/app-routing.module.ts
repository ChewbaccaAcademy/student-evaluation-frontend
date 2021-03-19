import { MainWindowFormComponent } from './main-window-form/main-window-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EvaluateStudentComponent } from './evaluate-student/evaluate-student.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '', component: MainLayoutComponent, children:
  [ { path: 'main', component: MainWindowFormComponent, canActivate: [AuthGuard] },
    { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddStudentFormComponent, canActivate: [AuthGuard] },
    { path: 'evaluate', component: EvaluateStudentComponent },
  ]},
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
