import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  AllPost: any = [{}];
  @ViewChild('callCopyLinkDailog') callCopyLinkDailog!: TemplateRef<any>;
  @ViewChild('callCreatepostDailog') callCreatepostDailog!: TemplateRef<any>;

  @Input() id: number | undefined;
  @Input() firstName: string = 'NA';

  @Input() lastName: string = 'NA';
  @Input() postContent: string = 'NA';

  @Output() post = new EventEmitter();
  link: any;

 
  createFormPost: FormGroup = new FormGroup({
    admin_id: new FormControl(),
    channel_id: new FormControl(),
    content: new FormControl('', Validators.required),
    file_path: new FormControl(),
  });

  PostContant = '';
  PostProfile(obj: any) {
    this.link = 'post/' + obj.id;
    this.router.navigate(['post/', obj.id]);
    console.log(obj.postContent);
    this.admin.updateDataPost(obj.postContent);
    debugger;

    this.dialog.open(this.callCopyLinkDailog);
  }

  CreatePostdialog() {
    let User: any = localStorage.getItem('userData');
    User = JSON.parse(User);
    let uid: number = +User.userid;
    this.createFormPost.controls['admin_id'].setValue(uid);
    this.createFormPost.controls['channel_id'].setValue(3);
    debugger;
    this.dialog.open(this.callCreatepostDailog);
  }

  CreatePost() {
    console.log(this.createFormPost.value);
    debugger;
    this.admin.CreatePost(this.createFormPost.value);
  }
  uploadImage(file: any) {
    if (file.length == 0) {
      return;
    }
    let fileToUpload = <File>file[0]; //
    const formDate = new FormData(); //object
    formDate.append('file', fileToUpload, fileToUpload.name);
    debugger;
    this.admin.uploadPostAttachment(formDate);
  }

  CommentByPostID: any = [{}];
  commentsList: any = [{}];
  ReactionList: any = [{}];
  message: any;
  isLike: boolean;
  currentuserId: any;

  ListSebscribe: any = [{}];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public home: HomeService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toster: ToastrService,
    public admin: AdminService,
    public User: UserService
  ) {}

  ngOnInit(): void {
    this.GetAllPost();
    this.GetAllComments();
    this.GetAllReaction();

    this.GetAllSabsecrib();

    let User: any = localStorage.getItem('userData');
    User = JSON.parse(User);
    this.currentuserId = User.userid;
    console.log('this.userId', this.currentuserId);
  }

  GetAllSabsecrib() {
    this.http
      .get('https://localhost:44301/api/Subscription/AllSubscription')
      .subscribe(
        (res) => {
          this.ListSebscribe = res;
        },
        (err) => {
          this.toster.error(err.message, err.status);
        }
      );
  }

  GetAllPost() {
    this.http.get('https://localhost:44301/api/Post/AllPost').subscribe(
      (res) => {
        // this.spinner.show();
        this.AllPost = res;
        // this.spinner.hide();
        // this.toster.success('Data Retriveed !' );
      },
      (err) => {
        // this.spinner.hide();
        this.toster.error(err.message, err.status);
      }
    );
  }

  UpdatePost(obj: any) {
    this.http.put('https://localhost:44301/api/Post/UpdatePost', obj).subscribe(
      (resp) => {},
      (err) => {}
    );
  }

  @ViewChild('callCreateServicesDailog') callCreateServicesDailog! :TemplateRef<any>;

  createFormReportChannel:FormGroup = new FormGroup({

    user_from:new FormControl(),
    post_id:new FormControl(),
    type:new FormControl(),
    description:new FormControl()
  })


  dialogepost(obj:any)
  {
    let User : any = localStorage.getItem("userData");
    User =JSON.parse(User);
    let uid : number =  +User.userid;
    
    this.dialog.open(this.callCreateServicesDailog);
    this.createFormReportChannel.controls['user_from'].setValue(uid);
    this.createFormReportChannel.controls['post_id'].setValue(obj.id);

  }
 InsertReportPost()
  {

    console.log(this.createFormReportChannel.value);
  this.User.InsertReportPost(this.createFormReportChannel.value);

  }


  DeletePost(id: number) {
    console.log('id', id);
    this.http
      .delete('https://localhost:44301/api/Post/DeletePost/delete/' + id)

      .subscribe(
        (resp) => {
          console.log('id 2', id);
          this.toster.success('Delete Post !');
        },
        (err) => {}
      );

    window.location.reload();
  }

  // GetAllComments(){
  //   this.http.get('https://localhost:44301/api/Comments/GetAllComments').subscribe((res)=>{

  //       this.commentsList=res;
  //       console.log("commentsList",this.commentsList);

  //       //this.spinner.hide();
  //       //this.toster.success('Data Retriveed !' );

  //     },err=>{
  //     this.spinner.hide();
  //       this.toster.error(err.message,err.status );
  //     }
  //     )
  // }

  GetAllComments() {
    this.http
      .get('https://localhost:44301/api/Comments/GetAllCommentPost')
      .subscribe(
        (res) => {
          this.commentsList = res;
          console.log('commentsList', this.commentsList);

          //this.spinner.hide();
          //this.toster.success('Data Retriveed !' );
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message, err.status);
        }
      );
  }

  // GetAllReaction() {
  //   this.http.get('https://localhost:44301/api/Reaction/AllReaction').subscribe(
  //     (resp: any) => {
  //       this.ReactionList = resp;
  //       console.log('ReactionList', this.ReactionList);
  //     },
  //     (err) => {
  //       this.toster.error(err.message, err.status);
  //     }
  //   );
  // }

  //GetAllReaction(){
  //this.http.get('https://localhost:44301/api/Reaction/getAllReaction')
  //.subscribe((resp:any)=>{
  // this.ReactionList=resp;
  // console.log("ReactionList",this.ReactionList);
  //
  //   },

  //     (err) => {

  //       this.toster.error(err.message, err.status);
  //      }
  //    )
  //  }

  GetAllReaction() {
    this.http
      .get('https://localhost:44301/api/Reaction/getAllReaction')
      .subscribe(
        (resp: any) => {
          this.ReactionList = resp;
          console.log('ReactionList', this.ReactionList);
        },
        (err) => {
          this.toster.error(err.message, err.status);
        }
      );
  }

  AddComment(obj: any) {
    let User: any = localStorage.getItem('userData');
    User = JSON.parse(User);
    let uid: number = +User.userid;
    let addCom = {
      UserId: uid,
      PostId: obj.id,
      Content: this.message,
    };
    console.log(obj);
    console.log(addCom);
    this.http
      .post('https://localhost:44301/api/Comments/InsertComment', addCom)
      .subscribe(
        (resp: any) => {
          // console.log(resp);
          // this.spinner.hide();

          this.toster.success(' send comment Successfully :)');
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message, err.status);
        }
      );
  }

  GetCommentByPostID(Postid: number) {
    this.http
      .get('https://localhost:44301/api/Comments/GetPostComments/' + Postid)
      .subscribe(
        (resp: any) => {
          this.CommentByPostID = resp;
          // this.spinner.hide();
          this.toster.success('Successfully :)');
        },
        (err) => {
          // this.spinner.hide()
          this.toster.error(err.message, err.status);
        }
      );
  }

  updateComment(id: number) {}

  DeleteComment(id: number) {
    this.http
      .delete('https://localhost:44301/api/Comments/DeleteComment/delete/' + id)

      .subscribe(
        (resp) => {
          this.toster.success(' send comment Successfully :)');
        },
        (err) => {
          this.spinner.hide();
          this.toster.error(err.message, err.status);
        }
      );
  }

  CheckLike(postid: number, userid: number) {
    this.http
      .get(
        'https://localhost:44301/api/Comments/GetPostComments/' +
          userid +
          '/' +
          postid
      )
      .subscribe(
        (resp: any) => {
          this.isLike = resp;
          // this.spinner.hide();
          this.toster.success('Successfully :)');
          console.log(this.isLike);
        },
        (err) => {
          // this.spinner.hide()
          this.toster.error(err.message, err.status);
        }
      );
  }

  DeleteLike(obj) {
    let User: any = localStorage.getItem('userData');
    User = JSON.parse(User);
    let uid: number = +User.userid;
    let DeleteLike = {
      userId: uid,
      postId: obj.id,
    };

    this.http
      .delete(
        'https://localhost:44301/api/Reaction/DeleteReaction/' +DeleteLike.userId +'/' + DeleteLike.postId
      )

      .subscribe(
        (resp) => {
          this.toster.success('Delete Like !');
        },
        (err) => {}
      );
  }

  createLike(obj) {
    let User: any = localStorage.getItem('userData');
    User = JSON.parse(User);
    let uid: number = +User.userid;
    let addLike = {
      user_id: uid,
      post_id: obj.id,
      is_react: 1,
    };

    if (this.currentuserId == addLike.user_id)
      this.http
        .post('https://localhost:44301/api/Reaction/InsertReaction', addLike)
        .subscribe(
          (resp: any) => {
            console.log(resp);
            // this.spinner.hide();
            //this.toster.success(' send comment Successfully :)')
            this.GetAllReaction();
          },
          (err) => {
            this.spinner.hide();
            this.toster.error(err.message, err.status);
          }
        );
  }
}
