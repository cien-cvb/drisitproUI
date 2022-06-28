import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { InstructorService } from 'src/app/services/instructor.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit {

  constructor(public instructorService: InstructorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
      this.instructorService.formData = {
      instId: null,
      instFirstName: null,
      instMiddleName: null,
      instLastName: null,
      instAddressLine: null,
      instRegion: null,
      instCity: null,
      instBrgy: null,
      instZipCode: null, 
      instDln: null,
      instAccredNo: null,
      instContactNo: null,
      instSuffix: null,
      instProvince: null,  
      instLtoPid: null,
    }
  }

  saveInstructor(){
    this.instructorService.createStudent(this.instructorService.formData).subscribe( res => {
        console.log(this.instructorService.formData);
        this.toastr.success('New Instructor was added successfully', 'Saved!');
        this.resetForm();
        this.triggeredFalseClick();
      }
    ),
    (error: any) => console.log(error);
  }
  
  onSubmit(form: NgForm){
    if(form.value.id == null){
      this.saveInstructor();
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
