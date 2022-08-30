import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  UpdateProfileUsers = new FormGroup({
    U_id :new FormControl(),
    U_first_name :new FormControl(),
    U_middle_name :new FormControl(),
    U_last_name :new FormControl(),
    U_gender :new FormControl(),
    U_image_path :new FormControl(),
    L_email :new FormControl(),
    L_phone :new FormControl()
  })
  chackPasswords = new FormGroup({
    loginId :new FormControl(7),
    oldPassword :new FormControl(),
    newPassword :new FormControl(),
    
  })
  
  constructor(public userService :UserService) { }

  ngOnInit(): void {

    this.userService.GetUserById();
    
    console.log(this.userService.GetUserByIdDto);
    
  }

  



  

  // p_data:any={};
  // updateDailog(obj:any){
  //   this.p_data={
  //     U_id:obj.U_id,
  //     U_first_name:obj.U_first_name,
  //     U_middle_name:obj.U_middle_name,
  //     U_last_name:obj.U_last_name,
  //     U_gender:obj.U_gender,
  //     U_image_path:obj.U_image_path,
  //   L_email:obj.U_gender,
  //   L_phone:obj.L_phone
     
     
  //   }
  //   console.log(this.p_data);
  //   this.UpdateProfileUsers.controls['U_id'].setValue(this.p_data.U_id); 
    
    
  // }
  uploadImage(file:any)
  {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object 
    formDate.append('file',fileToUpload,fileToUpload.name);
    // debugger
    this.userService.UpdateProfileUser(formDate);
  }
  UpdateProfileUser(){
    
  this.UpdateProfileUsers.controls['U_id'].setValue(9);
  this.UpdateProfileUsers.controls['U_first_name'].setValue(this.userService.GetUserByIdDto.U_first_name);
  this.UpdateProfileUsers.controls['U_middle_name'].setValue(this.userService.GetUserByIdDto.U_middle_name);
  this.UpdateProfileUsers.controls['U_last_name'].setValue(this.userService.GetUserByIdDto.U_last_name);
  this.UpdateProfileUsers.controls['U_image_path'].setValue(this.userService.GetUserByIdDto.U_image_path);
  this.UpdateProfileUsers.controls['U_gender'].setValue(this.userService.GetUserByIdDto.U_gender);
  this.UpdateProfileUsers.controls['L_email'].setValue(this.userService.GetUserByIdDto.L_email);
  this.UpdateProfileUsers.controls['L_phone'].setValue(this.userService.GetUserByIdDto.L_phone);
    // debugger
    // this.updateForm.controls['courseid'].setValue(this.p_data.courseid); 
    this.userService.UpdateProfileUser(this.UpdateProfileUsers.value);
    console.log(this.UpdateProfileUsers.value);
    
  }
  ChackPassword()
  {
    
    this.userService.ChackPassword(this.chackPasswords.value);
  }

}
