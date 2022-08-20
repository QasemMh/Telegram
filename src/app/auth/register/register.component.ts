import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {








  constructor(private authService:AuthService ,private router:Router ,private spinner: NgxSpinnerService , private http:HttpClient) { }
  registerForm : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl ('',[Validators.required,Validators.minLength(8)]),
    firstName : new FormControl ('',[Validators.required]),
    lastName : new FormControl ('',[Validators.required])
  })

  submit(){

  }
  goToLogin(){
    this.router.navigate(['auth/login'])
  }
  ngOnInit(): void {
  }

}
