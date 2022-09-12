import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  AllPost:any=[{}];
  @ViewChild('callCreatepostDailog') callCreatepostDailog! :TemplateRef<any>;

  constructor(public dialog: MatDialog,private router:Router,public Admin :AdminService , public home:HomeService ,private http:HttpClient ,private spinner :NgxSpinnerService ,private toster:ToastrService ,public admin:AdminService) { }


  createFormPost:FormGroup = new FormGroup({

    admin_id:new FormControl(),
    channel_id:new FormControl(),
    content:new FormControl('',Validators.required),
    file_path:new FormControl()
  })



  CreatePostdialog(){
    this.createFormPost.controls['admin_id'].setValue(10);
    this.createFormPost.controls['channel_id'].setValue(3);
    debugger
    this.dialog.open(this.callCreatepostDailog)
    }
  
  
  
    CreatePost(){
     
    console.log(this.createFormPost.value);
    debugger
    this.Admin.CreatePost(this.createFormPost.value);
    }
    uploadImage(file:any)
    {
      if(file.length==0){
      return ;}
      let fileToUpload=<File>file[0];//
      const formDate=new FormData();//object
      formDate.append('file',fileToUpload,fileToUpload.name);
      debugger
      this.Admin.uploadPostAttachment(formDate);
    }
  








  ngOnInit(): void {
    //  this.admin.AllPost();

     this.GetAllPost()
  }

  GetAllPost(){
    this.spinner.show();
     this.http.get('https://localhost:44301/api/Post/GetAllpost').subscribe((res)=>{
      this.AllPost=res;
      this.spinner.hide();
      this.toster.success('Data Retriveed !' );
    },err=>{
    this.spinner.hide();
      this.toster.error(err.message,err.status );
    }
    )

  }

}
