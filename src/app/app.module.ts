import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCommonModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule }  from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { StudentListComponent } from './views/student/student-list/student-list.component';
import { StudentFormComponent } from './views/student/student-form/student-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StudentDetailsComponent } from './views/student/student-details/student-details.component';
import { InstructorListComponent } from './views/instructor/instructor-list/instructor-list.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InstructorDetailsComponent } from './views/instructor/instructor-details/instructor-details.component';
import { CourseListComponent } from './views/course/course-list/course-list.component';
import { ToastrModule } from 'ngx-toastr';
import { InstructorFormComponent } from './views/instructor/instructor-form/instructor-form.component';
import { CourseFormComponent } from './views/course/course-form/course-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentDetailsComponent,
    InstructorListComponent,
    DashboardComponent,
    InstructorDetailsComponent,
    CourseListComponent,
    InstructorFormComponent,
    CourseFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
