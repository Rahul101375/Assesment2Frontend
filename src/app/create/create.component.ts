import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  myForm! : FormGroup ;
  statusArray: any = [true,false]
  constructor(private formBuilder:FormBuilder,private router:Router,private apiService:ApiService) { }

  ngOnInit(): void {
    this.myForm=this.formBuilder.group({
      userName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      status:['',Validators.required]
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }
  onSubmit(){
    let payload={
      userName:this.myForm?.value.userName,
      email:this.myForm?.value.email,
      contact:this.myForm?.value.contact,
      status:this.myForm?.value.status
    }
    this.apiService.postMethod(payload).subscribe((res:any)=>{
      this.router.navigate(['list']);
      this.reset();
    },(error)=>{
      alert("Api failed");
    })
  }
  reset(){
    this.myForm?.controls['userName'].reset();
    this.myForm?.controls['email'].reset();
    this.myForm?.controls['contact'].reset();
    this.myForm?.controls['status'].reset();
  }
}
