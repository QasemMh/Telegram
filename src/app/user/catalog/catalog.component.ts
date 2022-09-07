import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {render} from 'creditcardpayments/creditCardPayments';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @ViewChild('mypaypallButton') mypaypallButton! :TemplateRef<any>;
 
  createFormSubscripe:FormGroup = new FormGroup({
    ServicesId:new FormControl(),
    UserId:new FormControl()
  })
  constructor(public dialog: MatDialog ,public User :UserService) {
   

   }
    p_data:number= +localStorage.getItem('loginId');
   
   Createdialog(obj:any){
    this.dialog.open(this.mypaypallButton);
 
    render({
      id:"#mypaypallButtons",
      currency:"USD",
      value:"100.00",
      onApprove:(details)=>{
       alert("successfully");
      }
    });
    // console.log(obj);
    
    // console.log(obj.id);
    // console.log(obj.p_data);
    // this.CreateSubscripe(obj);
    // this.dialog.closeAll();
     
    } 

     createFormSubscripe:FormGroup = new FormGroup({
      ServicesId:new FormControl(),
      UserId:new FormControl()
    })
     
    CreateSubscripe(obj:any){
    this.createFormSubscripe.controls['ServicesId'].setValue(obj.id); 
    this.createFormSubscripe.controls['UserId'].setValue(2);
     this.Createdialog(obj);
      console.log(this.createFormSubscripe.value);
      this.User.CreateSubscripe(this.createFormSubscripe.value);
      // window.location.reload();
      }
   
  
 
  ngOnInit(): void {
    this.User.GetAllServices();
  }
}
