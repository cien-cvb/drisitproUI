import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { Nav } from 'src/app/models/nav';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  
  edit: boolean = false;
  id: number;
  courses: Course[];
  course: Course;
  nav = Nav;
  
  constructor(public courseService: CourseService, private router: Router, private toastr: ToastrService) {
    this.nav.isDisabledBtnDashBoard = false;
    this.nav.isDisabledBtnStudents = false;
    this.nav.isDisabledBtnInstructors = false;
    this.nav.isDisabledBtnCourses = true;
    this.nav.isDisabledBtnReports = false;
   }

  ngOnInit(): void {
    this.courseService.refreshNeeded$.subscribe(()=>{
      this.getCourses();
    });

    this.getCourses();

    this.resetForm();
  }

  getCourses(){
    this.courseService.getInstructorList().subscribe(res => {
      this.courses = res;
      console.log(this.courses);
    });  
  }

  onDeleteCourse(id: number){
    if(confirm('Do you really want to delete this Course?')){
      this.courseService.deleteCourse(id).subscribe( res => {
        this.toastr.info('Course was deleted successfully!', 'Delete Course');
        this.courses = res;
      });
    }
   }
   
  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.courseService.formData = {
      courseId: null,
      courseName: null,
      courseType: null,
      courseHours: null,
      courseFee: null,
    }
  }

  updateCourse(form: NgForm){
    this.courseService.updateCourse(form.value).subscribe( res => {
        console.log(this.courseService.formData);
        this.toastr.success('Course was updated successfully', 'Update Course');
        this.resetForm();
        this.triggeredFalseClick();
        this.ngOnInit();
      }
    ),
    (error: any) => console.log(error);
  }
   
  onSubmit(form: NgForm){  
    this.updateCourse(form);
  }

  populateForm(course: Course){
      
    if(!this.edit){
      this.edit = true;
    }
    this.courseService.formData = Object.assign({}, course);
    console.log(this.courseService.formData)
  }

  @ViewChild('reset') reset: ElementRef<HTMLElement>
  triggeredFalseClick(){
    let el: HTMLElement = this.reset.nativeElement;
    el.click();
  }

  onReset(){
    this.resetForm();
    this.edit = false;
  }

}
