import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import  {HttpClient} from '@angular/common/http'
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  formData: Student;

  private baseURL = "https://drisitproapi.azurewebsites.net";
  private studURL = this.baseURL + "/api/student";


  constructor(private httpClient: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$; 
  }

  getStudentList(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.studURL}`)
  }

  getStudentByID(id: number): Observable<Student>{
    return this.httpClient.get<Student>(`${this.studURL}/${id}`);
  }

  createStudent(student: Student): Observable<Object>{
    return this.httpClient
    .post(`${this.studURL}`, student)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  updateStudent(student: Student): Observable<Object>{
    console.log(student)
    return this.httpClient
    .put(`${this.studURL}/${student.studId}`, student)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  deleteStudent(id: number): Observable<Student[]>{
    return this.httpClient
    .delete<Student[]>(`${this.studURL}/${id}`)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    )
  }


}
