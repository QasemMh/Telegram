import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { window } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  AllPost: any = [{}];
  CommentByPostID: any = [{}];
  commentsList: any = [{}];
  ReactionList: any = [{}];
  message: any;
  isLike: boolean;
  currentuserId: any;
  ListSebscribe: any = [{}];

  constructor(
    private router: Router,
    public home: HomeService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toster: ToastrService,
    public admin: AdminService
  ) {}

  ngOnInit(): void {
    //  this.admin.AllPost();

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

  GetAllReaction(){
    this.http.get('https://localhost:44301/api/Reaction/getAllReaction').subscribe((resp:any)=>{
      this.ReactionList=resp;
      console.log("ReactionList",this.ReactionList);

    },
      err=>{

        this.toster.error(err.message , err.status)
      }
    )
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
        },
        (err) => {
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

  updateComment(id: number) {}

  DeleteComment(id: number) {
    this.http
      .delete('https://localhost:44301/api/Comments/DeleteComment/delete/' + id)

      .subscribe(
        (resp) => {
          this.toster.success('delete comment !');
        },
        (err) => {}
      );
  }
}
