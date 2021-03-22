import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { StudentListComponent } from './student-list/student-list.component';
import { MainWindowFormComponent } from './main-window-form/main-window-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserApiInterceptorService } from './services/interceptors/user-api-interceptor.service';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    StudentListComponent,
    MainWindowFormComponent,
    NavbarComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      tapToDismiss: false,
    }),
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserApiInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
