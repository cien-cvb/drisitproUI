import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/models/nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nav = Nav;
  constructor() { 
     this.nav.isDisabledBtnDashBoard = true;
     this.nav.isDisabledBtnStudents = false;
     this.nav.isDisabledBtnInstructors = false;
     this.nav.isDisabledBtnCourses = false;
     this.nav.isDisabledBtnReports = false;
  }

  ngOnInit(): void {
     
  }

}
