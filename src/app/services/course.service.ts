import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import  {HttpClient} from '@angular/common/http'
import { Course } from 'src/app/models/course';
import { CourseListComponent } from '../views/course/course-list/course-list.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  formData: Course;

  private baseURL = "https://drisitproapi.azurewebsites.net";
  private courseURL = this.baseURL + "/api/course";

  constructor(private httpClient: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$; 
  }

  getInstructorList(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.courseURL}`)
  }

  createCourse(course: Course): Observable<Object>{
    return this.httpClient
    .post(`${this.courseURL}`, course)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  updateCourse(course: Course): Observable<Object>{
    console.log(course)
    return this.httpClient
    .put(`${this.courseURL}/${course.courseId}`, course)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  deleteCourse(id: number): Observable<Course[]>{
    return this.httpClient
    .delete<Course[]>(`${this.courseURL}/${id}`)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    )
  }
}
