import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student'; 
import { StudentService } from 'src/app/services/student.service'; 
import { DatePipe } from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  edit: boolean = false;
  id: number;
  pipe = new DatePipe('en-US');
  dob: string;
  dobDate: Date;
  student: Student = new Student();
  constructor(public studentService: StudentService, private router: Router,
    private route: ActivatedRoute, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudentByID(this.id).subscribe(data => {
        this.student = data;
        this.dob = this.pipe.transform(this.student.studDob, 'MMMM d, y');
    }, error => console.log(error));
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

  updateStudent(form: NgForm){
    this.studentService.updateStudent(form.value).subscribe( res => {
        console.log(this.studentService.formData);
        this.toastr.success('Student was updated successfully', 'Updated Student!');
        this.resetForm();
        this.triggeredFalseClick();
        this.ngOnInit();
      }
    ),
    (error: any) => console.log(error);
  }
  

  onSubmit(form: NgForm){  
      this.updateStudent(form);
  }

  populateForm(student: Student){
    
    if(!this.edit){
      this.edit = true;
    }
    this.studentService.formData = Object.assign({}, student);
    console.log(this.studentService.formData)
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
        this.router.navigate(['students']);
      }
    }
    else{
      this.router.navigate(['students']);
    }
  }
}
