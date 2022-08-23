import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {





  constructor(private authService:AuthService ,private router:Router ,private spinner: NgxSpinnerService) { }


  email: FormControl = new FormControl('', [ Validators.required]);
  password : FormControl = new FormControl('', Validators.minLength(6));



   submit(){
    this.authService.submit(this.email,this.password)

  }

  goToRegister(){
    this.router.navigate(["auth/register"]);
  }
  ngOnInit(): void {
  }


}



