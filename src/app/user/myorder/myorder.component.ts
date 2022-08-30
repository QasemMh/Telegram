import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  
  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;
  constructor(public dialog: MatDialog ,public User :UserService) { }

  ngOnInit(): void {
    this.User.GetUserSubscription();
  }



  deleteSubscription(body:any)
  {
    
    const dialogVal= this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe((res)=>{
      if(res!=undefined)
        {
          if (res=='yes')
          this.User.deleteSubscription(body);
        
        else (res=='no')
           console.log("Thank you");
        }     
    })
   
  }
}
