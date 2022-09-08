import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmailblockService } from 'src/app/services/emailblock.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blockuser',
  templateUrl: './blockuser.component.html',
  styleUrls: ['./blockuser.component.css']
})
export class BlockuserComponent implements OnInit {

  constructor(public dialog: MatDialog,public emailblock :EmailblockService ) { }
  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;

  ngOnInit(): void {
    this.emailblock.GetAllBlockUserAndSendEmail();
  }
  EmailSend(id:number)
  {
    const dialogVal= this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe((result:any)=>{
      if(result!=undefined)
        {
          if(result=='yes')
          this.emailblock.EmailSend(id);
          
        else (result=='no')
        console.log("Thank you");
             }
    })

  }
}
