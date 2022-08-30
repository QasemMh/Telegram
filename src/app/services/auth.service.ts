import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,

  ) {}


  submit(email: any, pass: any) {
    this.spinner.show();

    const body = {
      username: email.value.toString(),
      password: pass.value.toString(),
    }


    const headerRef = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    const requestOptions = {
      headers: new HttpHeaders(headerRef),
    }
    //

 this.http.post('https://localhost:44301/api/Login/authon/auth', body, requestOptions)
      .subscribe(
        (data) => {
          console.log('token:');
          console.log(data);
          this.spinner.hide();
          const respons = {
            token: data.toString(),
          };

          localStorage.setItem('token', respons.token);
          let decoded: any = jwt_decode(respons.token);
          localStorage.setItem('userData', JSON.stringify(decoded));

          console.log('decoded token');
          console.log(decoded);

        if (decoded.role == 'Admin') {
            this.router.navigate(['/admin/dashboard']);
           } else {
            this.router.navigate(['/user/chat']);
           }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('Invalid Credentials', 'Error');
        }
      );
    //
  }





}
