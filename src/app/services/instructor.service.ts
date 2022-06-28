import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import  {HttpClient} from '@angular/common/http'
import { Instructor } from 'src/app/models/instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  
  formData: Instructor;

  private baseURL = "https://drisitproapi.azurewebsites.net";
  private instURL = this.baseURL + "/api/instructor";

  constructor(private httpClient: HttpClient) { } 

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$; 
  }

  getInstructorList(): Observable<Instructor[]>{
    return this.httpClient.get<Instructor[]>(`${this.instURL}`)
  }

  getInstructorByID(id: number): Observable<Instructor>{
    return this.httpClient.get<Instructor>(`${this.instURL}/${id}`);
  }

  createStudent(instructor: Instructor): Observable<Object>{
    return this.httpClient
    .post(`${this.instURL}`, instructor)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  updateInstructor(instructor: Instructor): Observable<Object>{
    console.log(instructor)
    return this.httpClient
    .put(`${this.instURL}/${instructor.instId}`, instructor)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  deleteInstructor(id: number): Observable<Instructor[]>{
    return this.httpClient
    .delete<Instructor[]>(`${this.instURL}/${id}`)
    .pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    )
  }
  

}
