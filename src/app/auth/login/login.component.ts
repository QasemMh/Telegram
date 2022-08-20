import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  constructor(private authService:AuthService ,private router:Router ,private spinner: NgxSpinnerService) { }

  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
   passFormControl = new FormControl('', Validators.minLength(6));

   submit(){
    this.spinner.show();
    setTimeout(() => {
    /** spinner ends after 5 seconds */this.spinner.hide();
    }, 5000);
  }

  goToRegister(){
    this.router.navigate(["auth/register"]);
  }
  ngOnInit(): void {
  }


handel(){
  this.authService.login();
}

}



