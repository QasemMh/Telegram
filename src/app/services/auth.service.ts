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
      .subscribe(
        (data) => {

          const respons = {
            token: data.toString(),
          };
          localStorage.setItem('userToken', respons.token);
          let decoded: any = jwt_decode(respons.token);
          localStorage.setItem('userData', JSON.stringify(decoded));
          this.decodedToken = decoded;
          this.decodedloginId = decoded.loginId;

          this.adminService.GetFullUserById(+decoded.userid).subscribe(
            (res) => {
              this.spinner.hide();

              let element: any = res;
              if (
                element.loginId == this.decodedToken.loginId &&
                element.isBlocked == 1
              ) {
                this.toastr.error('you blocked and cannot sign in', 'Error');
              } else if (
                element.loginId == this.decodedToken.loginId &&
                element.isBlocked != 1
              ) {
                if (this.decodedToken.role == 'Admin') {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/user']);
                }
              }
            },
            (err) => {
              this.spinner.hide();

              this.toastr.error('error in connection', 'Error');
            }
          );
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('Invalid Credentials', 'Error');
        }
      );
  }
}
