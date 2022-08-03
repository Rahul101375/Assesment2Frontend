import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 allData:any;
 id:any;
 editForm!:FormGroup 
  constructor(private apiService:ApiService,public dialog: MatDialog,private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.apiService.getMethod().subscribe((res:any)=>{
      if(res){
        this.allData=res.data;
      }
    })
  }
  edit(id:any){
    this.id=id;
    this.editDialog();
  }

  delete(id:any){
    this.id=id;
    this.openDialog()
  }
  openDialog() {
    const dialogRef=this.dialog.open(DialogElementsExampleDialog,{
      width:"400px",
      height:"200px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.apiService.deleteMethod(this.id).subscribe((res:any)=>{
          this.ngOnInit();
        },(error)=>{
          console.log("deleteError",error)
        })
      }
    });
  }

  editDialog() {
    let getData=this.allData.find((item:any)=>{if(item.Id===this.id)return item})
    const dialogRef=this.dialog.open(EditDialogElementsExampleDialog,{
      data:getData?getData:''
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogElementsExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogElementsExampleDialog>,
  ) {}
  cancel(): void {
    this.dialogRef.close(false);
  }
  conform(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'edit-dialog-elements-example-dialog',
  templateUrl: 'edit.dialog.component.html',
})
export class EditDialogElementsExampleDialog {
  dialogForm!:FormGroup;
  id:any;
  statusArray: any = [true,false]
  constructor(private formBuilder:FormBuilder,private apiService:ApiService,private router:Router,
    public dialogRef: MatDialogRef<EditDialogElementsExampleDialog>,@Inject(MAT_DIALOG_DATA) public data:DialogRef
  ) {}
  ngOnInit(): void {
    console.log("dialog",this.data)
    let  {Id,name,email,contact,status}:any=this.data
    console.log("dialog",name,email,contact,status)
    this.dialogForm=this.formBuilder.group({
      userName:[''],
      email:[''],
      contact:[''],
      status:['']
    })
    if(this.data){
      this.dialogForm.patchValue({
        userName:name,
        email:email,
        contact:contact,
        status:status=="1"?true:false
      })
    }
    this.id=Id;
  }
  onUpdate(){
    console.log("editForm",this.dialogForm?.value)
    let payload={
      userName:this.dialogForm?.value.userName,
      email:this.dialogForm?.value.email,
      contact:this.dialogForm?.value.contact,
      status:this.dialogForm?.value.status
    }
    this.apiService.putMethod(this.id,payload).subscribe((res:any)=>{
      console.log("update",res);
      this.dialogRef.close(true)
    },(error)=>{
      console.log(error);
      this.dialogRef.close(false);
    })
  }
  reset(){
    this.dialogRef.close(false);
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.dialogForm.controls[controlName].hasError(errorName);
  }
}

