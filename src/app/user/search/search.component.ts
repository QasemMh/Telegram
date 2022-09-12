import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {render} from 'creditcardpayments/creditCardPayments';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public dialog: MatDialog,public User :UserService) {
   

  }


  ngOnInit(): void {

    this.User.GetAllGroups()
  }







  nameGroup:any='';
  inputValue(ev:any){
    this.nameGroup=ev.target.value;
    console.log(ev.target.value);

   
  }

 
  search()
  {
    
      const groupobj=
      {
        nameGroup:this.nameGroup.toString()
      };
      this.User.searchGroup(groupobj);
      
  }

}
