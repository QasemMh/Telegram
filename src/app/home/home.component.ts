import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  CreateContact: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
  });
  constructor(
    public home: HomeService,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}
  IsLogin: boolean = false;
  userData: any;
  userPath: any = '/user';
  ngOnInit(): void {
    this.spinner.show();
    this.home.getHomeInfo();
    this.home.getAboutUsInfo();
    this.home.GetAcceptTestimonial();
    this.home.GetTop5Like();
    this.home.GetTop5Comment();

    this.userData = this.userService.GetUserFromLocalStorage();
    if (this.userData) {
      this.IsLogin = true;
      this.userData.role.indexOf('Admin') > -1
        ? (this.userPath = '/admin')
        : (this.userPath = '/user');
    }
    this.spinner.hide();
  }
  uploadImage(file: any) {
    if (file.length == 0) return;
    let fileToUpload = <File>file[0]; //
    const formDate = new FormData(); //object
    formDate.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.home.uploadAttachment(formDate);
  }

  CreateContactUs() {
    console.log(this.CreateContact.value);
    this.home.createContact(this.CreateContact.value);
    debugger;
  }
}
