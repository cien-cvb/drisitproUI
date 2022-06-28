import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { InstructorService } from 'src/app/services/instructor.service';
import { ToastrService } from 'ngx-toastr';
import { Nav } from 'src/app/models/nav';
@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss']
})
export class InstructorListComponent implements OnInit {

  id: number;
  instructors: Instructor[];
  instructor: Instructor;
  nav = Nav;

  constructor(private instructorService: InstructorService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nav.isDisabledBtnDashBoard = false;
     this.nav.isDisabledBtnStudents = false;
     this.nav.isDisabledBtnInstructors = true;
     this.nav.isDisabledBtnCourses = false;
     this.nav.isDisabledBtnReports = false;

    this.instructorService.refreshNeeded$.subscribe(()=>{
      this.getInstructors();
    });

    this.getInstructors();

  }

 getInstructors(){
    this.instructorService.getInstructorList().subscribe(res => {
      this.instructors = res;
      console.log(this.instructors);
    });  
  }

  onViewInstructorDetails(id: number){
    this.router.navigate(['instructor-details', id])
 }

 onDeleteInstructor(id: number){
  if(confirm('Do you really want to delete this Instructor?')){
    this.instructorService.deleteInstructor(id).subscribe( res => {
      this.toastr.info('Instructor was deleted successfully!', 'Delete Instructor');
      this.instructors = res;
    });
  }
 }

}
