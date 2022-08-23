import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegesterService } from 'src/app/services/regester.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private authService:AuthService ,private router:Router ,private spinner: NgxSpinnerService , private http:HttpClient , private reg:RegesterService) { }
  registerForm : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl ('',[Validators.required,Validators.minLength(8)]),
    confirmpassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    firstName : new FormControl ('',[Validators.required]),
    lastName : new FormControl ('',[Validators.required]),
    userName : new FormControl ('',[Validators.required]),
    gender:new FormControl(''),

  })





  submit(){
    const obj ={
      u_first_name : this.registerForm.value.firstName.toString(),
      u_last_name : this.registerForm.value.lastName.toString(),
      l_username : this.registerForm.value.userName.toString(),
      l_email : this.registerForm.value.email.toString(),
      l_password : this.registerForm.value.password.toString(),
      u_gender : this.registerForm.value.gender.toString()

    }
    this.reg.submit(obj);
  }
  goToLogin(){
    this.router.navigate(['auth/login'])
  }
  matchError(){
    if(this.registerForm.controls['password'].value==this.registerForm.controls['confirmpassword'].value)
    this.registerForm.controls['confirmpassword'].setErrors(null)
    else
    this.registerForm.controls['confirmpassword'].setErrors({mismatch:true})
  }
  ngOnInit(): void {
  }

}
