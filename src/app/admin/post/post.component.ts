import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  AllPost:any=[{}];
  constructor(private router:Router , public home:HomeService ,private http:HttpClient ,private spinner :NgxSpinnerService ,private toster:ToastrService ,public admin:AdminService) { }

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
