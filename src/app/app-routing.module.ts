import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './views/student/student-list/student-list.component';
import { StudentDetailsComponent } from './views/student/student-details/student-details.component';
import { InstructorListComponent } from './views/instructor/instructor-list/instructor-list.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InstructorDetailsComponent } from './views/instructor/instructor-details/instructor-details.component';
import { CourseListComponent } from './views/course/course-list/course-list.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'students', component: StudentListComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'student-details/:id', component: StudentDetailsComponent},
  {path: 'instructors', component: InstructorListComponent},
  {path: 'instructor-details/:id', component: InstructorDetailsComponent},
  {path: 'courses', component: CourseListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
