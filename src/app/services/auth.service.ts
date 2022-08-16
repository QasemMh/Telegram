import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private spinner: NgxSpinnerService, private toastr:ToastrService) {}


  login(){

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.toastr.success('Successfully logged in');
    }, 3000);

  }
}
