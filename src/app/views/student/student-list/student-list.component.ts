import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { Nav } from 'src/app/models/nav';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  id: number;
  students: Student[];
  student: Student;

  nav = Nav;

  constructor(private studentService: StudentService, private router: Router, private toastr: ToastrService) {}


  ngOnInit(): void {

    this.nav.isDisabledBtnStudents = true;
    this.nav.isDisabledBtnDashBoard = false;

    this.studentService.refreshNeeded$.subscribe(()=>{
      this.getStudents();
    });

    this.getStudents();

     this.nav.isDisabledBtnDashBoard = false;
     this.nav.isDisabledBtnStudents = true;
     this.nav.isDisabledBtnInstructors = false;
     this.nav.isDisabledBtnCourses = false;
     this.nav.isDisabledBtnReports = false;
    
  }

  getStudents(){
    this.studentService.getStudentList().subscribe(res => {
      this.students = res;
      console.log(this.students);
    });  
  }

  onViewStudentDetails(id: number){
    this.router.navigate(['student-details', id])
 }

 onDeleteStudent(id: number){
  if(confirm('Do you really want to delete this Student?')){
    this.studentService.deleteStudent(id).subscribe( res => {
      this.toastr.info('Student was deleted successfully!', 'Delete Student');
      this.students = res;
    });
  }
 }
 
}
