import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('callUpdateProfileDailog') callUpdateProfileDailog! :TemplateRef<any>;

  constructor(public dialog: MatDialog,public admin:AdminService) { }
  UpdateProfileUsers = new FormGroup({
    u_id :new FormControl(),
    u_first_name :new FormControl(),
    u_middle_name :new FormControl(),
    u_last_name :new FormControl(),
    u_image_path :new FormControl(), 
    u_gender :new FormControl(),
    l_email :new FormControl(),
    l_phone :new FormControl()
  })
  ngOnInit(): void {

    let User : any = localStorage.getItem("userData");
   User =JSON.parse(User);
   let uid : number =  +User.userid;
    this.admin.GetUserById(uid);
    
    console.log(this.admin.GetUserByIdDto);
    
  }
  uploadImage(file:any)
  {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object 
    formDate.append('file',fileToUpload,fileToUpload.name);
    // debugger
    this.admin.uploadAttachment(formDate);
  }
  p_data:any;
  updateDailog(obj:any){
    
    let User : any = localStorage.getItem("userData");
    User =JSON.parse(User);
    let uid : number =  +User.userid;
    this.p_data={
      u_id:uid,
      u_first_name:obj.first_Name,
      u_middle_name:obj.middle_Name,
      u_last_name:obj.last_Name,
      
      u_image_path:obj.images,
      u_gender:obj.gender,
      l_email:obj.email,
      l_phone:obj.phone
     
     
    }


  

    
    this.UpdateProfileUsers.controls['u_id'].setValue(uid);
    this.dialog.open(this.callUpdateProfileDailog)

     debugger
    // this.updateForm.controls['courseid'].setValue(this.p_data.courseid); 
    // this.admin.UpdateProfileUser(this.UpdateProfileUsers.value);
     console.log(this.UpdateProfileUsers.value);
    
  }

  

  UpdateProfileUser(){
    
  
     debugger
    // this.updateForm.controls['courseid'].setValue(this.p_data.courseid); 
    this.admin.UpdateProfileUser(this.UpdateProfileUsers.value);
    console.log(this.UpdateProfileUsers.value);
    
  }

}
