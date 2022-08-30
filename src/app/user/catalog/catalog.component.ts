import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {render} from 'creditcardpayments/creditCardPayments';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @ViewChild('mypaypallButton') mypaypallButton! :TemplateRef<any>;
  constructor(public dialog: MatDialog,public User :UserService) {
   

   }

   Createdialog(){
    this.dialog.open(this.mypaypallButton)
    render({
      id:"#mypaypallButtons",
      currency:"USD",
      value:"100.00",
      onApprove:(details)=>{
       alert("successfully")
      }
 
    })
    }
  
  ngOnInit(): void {
    this.User.GetAllServices();
  }

}
