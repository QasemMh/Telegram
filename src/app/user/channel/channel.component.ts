import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  @ViewChild('callCreateServicesDailog') callCreateServicesDailog! :TemplateRef<any>;
  createFormReportChannel:FormGroup = new FormGroup({
   
    user_from:new FormControl(),
    post_id:new FormControl(),
    type:new FormControl(),
    description:new FormControl()
  })
  constructor(public dialog: MatDialog,public User :UserService) { }

  ngOnInit(): void {
   this.User.GetAllPostByChanel();
  }

  dialogepost(obj:any)
  {
    this.dialog.open(this.callCreateServicesDailog);
    this.createFormReportChannel.controls['user_from'].setValue(9);
    this.createFormReportChannel.controls['post_id'].setValue(obj.id); 
   
  }
 InsertReportPost()
  {

    console.log(this.createFormReportChannel.value);
  this.User.InsertReportPost(this.createFormReportChannel.value);
    
  }
}
