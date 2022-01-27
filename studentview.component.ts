import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';

@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.component.html',
  styleUrls: ['./studentview.component.css']
})
export class StudentviewComponent implements OnInit {

  formValue !: FormGroup;
  StudentModelObj: StudentModel = new StudentModel();
  StudentData !: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder ,
     private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      class: ['']
    })
    this.GetAllStudent();
  }
  clickAddStudent() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  
  }
  PostStudentDetails() {
    this.StudentModelObj.firstName = this.formValue.value.firstName;
    this.StudentModelObj.lastName = this.formValue.value.lastName;
    this.StudentModelObj.email = this.formValue.value.email;
    this.StudentModelObj.mobile = this.formValue.value.mobile;
    this.StudentModelObj.class = this.formValue.value.class;

    this.api.PostStudent(this.StudentModelObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("Student Details added successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.GetAllStudent();
      })
  }
  GetAllStudent() {
    this.api.GetAllStudent()
      .subscribe((res: any) => {
        this.StudentData = res;

      })
  }
  DeleteStudent(row: any) {
    this.api.DeleteStudent(row.firstName)
      .subscribe(res => {
        alert("Student deleted");
        this.GetAllStudent();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['class'].setValue(row.class)
    
  }
  UpdateStudentDetails() {
    this.StudentModelObj.firstName = this.formValue.value.firstName;
    this.StudentModelObj.lastName = this.formValue.value.lastName;
    this.StudentModelObj.email = this.formValue.value.email;
    this.StudentModelObj.mobile = this.formValue.value.mobile;
    this.StudentModelObj.class = this.formValue.value.class;
    this.api.UpdateStudent(this.StudentModelObj, this.StudentModelObj.firstName)
      .subscribe((res: any)=> {
        alert("upadated Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.GetAllStudent();

      }
    )
  }
} 
  