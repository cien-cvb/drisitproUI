import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout'
import { StudentService } from './services/student.service';
import { NgForm } from '@angular/forms';
import { Nav } from './models/nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  events: string[] = [];
  opened: boolean;

  isSideBarOver: boolean;

  nav = Nav;

  
  constructor( private studentService: StudentService, private observer: BreakpointObserver){
  
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.studentService.formData = {
      studId: null,
      studFirstName: null,
      studMiddleName: null,
      studLastName: null,
      studAddressLine: null,
      studRegion: null,
      studCity: null,
      studBrgy: null,
      studZipCode: null,
      studNationality: null,
      studAge: null,
      studGender: null,
      studMaritalStatus: null,
      studDob: null,
      studDln: null,
      studPhoto: null,
      studSuffix: null,
      studProvince: null,
      studContactNo: null,
      studStatus: 'New',
      studLtoPortalId: null,
      studEmail: null
    }
  }

  
  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches){
        this.sidenav.mode = 'over'
        this.sidenav.close();
        this.isSideBarOver = true;
      } else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.isSideBarOver = false;
      }
    });
  }

  closeSideBarOver(){
    if(this.isSideBarOver){
      this.sidenav.close();
    }
  }

  // onClickBtnDashboard(){
  //   AppComponent.isDisabledBtnDashBoard = true;
  //   AppComponent.isDisabledBtnStudents = false;
  //   AppComponent.isDisabledBtnInstructors = false;
  //   AppComponent.isDisabledBtnCourses = false;
  //   AppComponent.isDisabledBtnReports = false;
  // }

  // onClickBtnStudents(){
  //   AppComponent.isDisabledBtnDashBoard = false;
  //   AppComponent.isDisabledBtnStudents = true;
  //   AppComponent.isDisabledBtnInstructors = false;
  //   AppComponent.isDisabledBtnCourses = false;
  //   AppComponent.isDisabledBtnReports = false;
  // }

  // onClickBtnInstructors(){
  //   AppComponent.isDisabledBtnDashBoard = false;
  //   AppComponent.isDisabledBtnStudents = false;
  //   AppComponent.isDisabledBtnInstructors = true;
  //   AppComponent.isDisabledBtnCourses = false;
  //   AppComponent.isDisabledBtnReports = false;
  // }

  // onClickBtnCourses(){
  //   AppComponent.isDisabledBtnDashBoard = false;
  //   AppComponent.isDisabledBtnStudents = false;
  //   AppComponent.isDisabledBtnInstructors = false;
  //   AppComponent.isDisabledBtnCourses = true;
  //   AppComponent.isDisabledBtnReports = false;
  // }

  // onClickBtnReports(){
  //   AppComponent.isDisabledBtnDashBoard = false;
  //   AppComponent.isDisabledBtnStudents = false;
  //   AppComponent.isDisabledBtnInstructors = false;
  //   AppComponent.isDisabledBtnCourses = false;
  //   AppComponent.isDisabledBtnReports = true;
  // }


}
