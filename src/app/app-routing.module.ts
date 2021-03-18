import { MainWindowFormComponent } from './main-window-form/main-window-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';

const routes: Routes = [//kai atsiras main window, tada pasikoreguosim
  {path: '', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'main', component: MainWindowFormComponent },
  {path: 'add', component: AddStudentFormComponent }, 
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
