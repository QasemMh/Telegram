import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  @ViewChild('callCopyLinkDailog') callCopyLinkDailog! :TemplateRef<any>;
 
  @ViewChild('callCreateServicesDailog') callCreateServicesDailog! :TemplateRef<any>;
  @Output() post=new EventEmitter();
  
  constructor(private router:Router,public Admin :AdminService ,public dialog: MatDialog, public User :UserService) { }

  ngOnInit(): void {
    this.User.GetChannelPosts();

    this.Admin.GetAllGroups();
  }
  createFormReportChannel:FormGroup = new FormGroup({
   
    user_from:new FormControl(),
    post_id:new FormControl(),
    type:new FormControl(),
    description:new FormControl()
  })
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
  // <!-- 
  //   "channel_id": 4,
  //   "id": 3,
  //   "firstName": "tasneem",
  //   "lastName": "rawashdeh",
  //   "postContent": "post2",
  //   "createAt": "2022-08-09T11:14:39.622",
  //   "filePath": "cccccccc",
  //   "countComment": 9,
  //   "countLike": 9 -->
  link: any;

  PostProfile(obj:any)
  {

    this.post.emit();
    this.User.selectedPost={
      channel_id:obj.channel_id,
      id:obj.id,
      firstName:obj.firstName,
      lastName:obj.lastName,
      postContent:obj.postContent,
      createAt:obj.createAt,
      filePath:obj.filePath,
      countComment:obj.countComment,
      countLike:obj.countLike,
    }
   this.link='channel/'+obj.channel_id+'/post/'+obj.id;
     this.router.navigate(['channel/',obj.channel_id,'/post/',obj.id]);
    this.dialog.open(this.callCopyLinkDailog);
  }
}
