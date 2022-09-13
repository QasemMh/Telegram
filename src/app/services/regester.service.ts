import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class RegesterService {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) { }

  submit(body : any){
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44301/api/Users/RegisterUser' , body).subscribe((resp:any)=>{
      this.spinner.hide();
      this.toastr.success('Register Successfully :)')
    },
      err=>{
        this.spinner.hide()
        this.toastr.error(err.message , err.status)
      }
    )
  }


}
