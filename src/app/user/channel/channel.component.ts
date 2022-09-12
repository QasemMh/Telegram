import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild  } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  @ViewChild('callCopyLinkDailog') callCopyLinkDailog! :TemplateRef<any>;

  @ViewChild('callCreateServicesDailog') callCreateServicesDailog! :TemplateRef<any>;
  @Output() post=new EventEmitter();
  link: any;
  createFormReportChannel:FormGroup = new FormGroup({

    user_from:new FormControl(),
    post_id:new FormControl(),
    type:new FormControl(),
    description:new FormControl()
  })
  constructor(private router:Router,public dialog: MatDialog,public User :UserService) { }

  ngOnInit(): void {
   this.User.GetChannelPosts();
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
    this.link=this.router.navigate(['channel',obj.channel_id, 'post', obj.id]);
    this.dialog.open(this.callCopyLinkDailog);
  }
 }

