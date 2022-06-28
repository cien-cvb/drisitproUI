import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { StudentService } from 'src/app/services/student.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  constructor(public studentService: StudentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
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
  
  saveStudent(){
    this.studentService.createStudent(this.studentService.formData).subscribe( res => {
        console.log(this.studentService.formData);
        this.toastr.success('New Student was added successfully', 'Saved!');
        this.resetForm();
        this.triggeredFalseClick();
      }
    ),
    (error: any) => console.log(error);
  }
  
  onSubmit(form: NgForm){
    if(form.value.id == null){
      this.saveStudent();
    }
  }
  
  @ViewChild('reset') reset: ElementRef<HTMLElement>
  triggeredFalseClick(){
    let el: HTMLElement = this.reset.nativeElement;
    el.click();
  }
  
  onReset(){
    this.resetForm();
  }


}
