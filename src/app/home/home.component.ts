import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// //AboutUsInfo
//   @Input()id :number|undefined
//   @Input()img :string|undefined
//   @Input()contant :string|undefined

//   //HomeInfo
//   @Input()name :string|undefined
//   @Input()logo :string|undefined
//   @Input()email :string|undefined
//   @Input()phone :string|undefined
//   @Input()address :string|undefined

CreateContact:FormGroup=new FormGroup({
  username :new FormControl(),
  email  :new FormControl(),
  subject  :new FormControl(),
  message  :new FormControl()
})
  constructor(public home :HomeService) { }

  ngOnInit(): void {

    this.home.getHomeInfo();
    this.home.getAboutUsInfo();
    console.log(this.home.HomePage.address)
   // console.log(this.home.getAboutUsInfo())
  }
  uploadImage(file:any)
  {
    if(file.length==0)
    return ;
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger
    this.home.uploadAttachment(formDate);
  }

  CreateContactUs(){
    console.log(this.CreateContact.value)
    this.home.createContact(this.CreateContact.value);
    debugger
  }
}

// {
//   "id": 1,
//   "name": "Telegram",
//   "logo": "Logo",
//   "img": "Img",
//   "email": "telegram@gmail.com",
//   "phone": "07716482",
//   "address": "Jordan-Irbid"
// }
