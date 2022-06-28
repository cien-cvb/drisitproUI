import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor'; 
import { InstructorService } from 'src/app/services/instructor.service'; 
import { DatePipe } from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss']
})
export class InstructorDetailsComponent implements OnInit {

  edit: boolean = false;
  id: number;
  pipe = new DatePipe('en-US');
  dob: string;
  dobDate: Date;
  instructor: Instructor = new Instructor();
  
  constructor(public instructorService: InstructorService, private router: Router,
    private route: ActivatedRoute, public toastr: ToastrService) { }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.instructorService.getInstructorByID(this.id).subscribe(data => {
        this.instructor = data;
    }, error => console.log(error));
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
      instSuffix: null,
      instProvince: null,
      instContactNo: null,
      instLtoPid: null,
      instAccredNo: null
    }
  }

  updateInstructor(form: NgForm){
    this.instructorService.updateInstructor(form.value).subscribe( res => {
        console.log(this.instructorService.formData);
        this.toastr.success('Instructor was updated successfully', 'Updated Instructor!');
        this.resetForm();
        this.triggeredFalseClick();
        this.ngOnInit();
      }
    ),
    (error: any) => console.log(error);
  }
  

  onSubmit(form: NgForm){  
      this.updateInstructor(form);
  }

  populateForm(instructor: Instructor){
    
    if(!this.edit){
      this.edit = true;
    }
    this.instructorService.formData = Object.assign({}, instructor);
    console.log(this.instructorService.formData)
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

  onBack(){
    console.log(this.edit)
    if(this.edit){
      if(confirm('Do you want to discard changes?')){
        this.onReset();
        this.router.navigate(['instructor']);
      }
    }
    else{
      this.router.navigate(['instructor']);
    }
  }

}
