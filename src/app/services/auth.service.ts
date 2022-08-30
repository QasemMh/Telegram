import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  decodedloginId!: number;
  decodedToken: any;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private adminService: AdminService
  ) {}

  submit(email: any, pass: any) {
    this.spinner.show();

    const body = {
      username: email.value.toString(),
      password: pass.value.toString(),
    };

    const headerRef = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerRef),
    };
    //

     this.http
      .post(
        'https://localhost:44301/api/Login/authon/auth',
        body,
        requestOptions
      )
      .subscribe((data) => {
        console.log('token:');
        console.log(data);
        this.spinner.hide();
        const respons = {
          token: data.toString(),
        };
        localStorage.setItem('token', respons.token);
        let decoded: any = jwt_decode(respons.token);
        localStorage.setItem('userData', JSON.stringify(decoded));
        this.decodedToken = decoded;
        this.decodedloginId = decoded.loginId;
        
        this.adminService.GetAllUser().subscribe((res: any) => {
          res.forEach((element: any) => {
            if (element.login_id == this.decodedToken.loginId && element.is_blocked == 1) {
                // alert('you blocked and cannot sign in');
                this.toastr.error('you blocked and cannot sign in', 'Error');
            }
            else if (element.login_id == this.decodedToken.loginId && element.is_blocked != 1) {
              if (this.decodedToken.role == 'Admin') {
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/home']);
              }
            }
          });
          //
        });
  },
  (error) => {
    this.spinner.hide();
    this.toastr.error('Invalid Credentials', 'Error');
  }
  );


  }

}
