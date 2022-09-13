import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  Groups: any = [{}];
  SearchGroupDto: any = [{}];
  Story: any = {};

  selectedPost: any = {};
  constructor(
    public http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  GetUserByIdDto: any = {};
  UpdateProfileUserDTO: any = {};
  Users: any = {};
  Services: any = [{}];
  UserSubscription: any = [{}];
  post: any = [{}];
  ReportPost: any = {};
  Testimonial: any = {};
  ChannelPosts: any = [{}];
  //display_Image_Profile: any;
  userChatData: any;
  userProfileSide: boolean = false;
  profileId: any;
  display_Image: any;
  //
  GetChannelPosts() {
    this.http
      .get(
        'https://localhost:44301/api/FunctionUser/ChannelPosts/ChannelPosts/4'
      )
      .subscribe((res) => {
        this.ChannelPosts = res;
      });
  }

  deleteSubscription(body: any) {
    this.http
      .delete(
        'https://localhost:44301/api/Subscription/DeleteSubscription',
        body
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {}
      );
    window.location.reload();
  }

  GetAllServices() {
    this.http
      .get('https://localhost:44301/api/Services/GetAllSERVICES')
      .subscribe((res) => {
        this.Services = res;
      });
  }

  p_data: number = +localStorage.getItem('loginId');
  GetUserSubscription() {
    this.http
      .get(
        'https://localhost:44301/api/Subscription/GetUserSubscription/' +
          this.p_data
      )
      .subscribe((res) => {
        this.UserSubscription = res;
      });
  }

 
  UpdateProfileUser(body: any) {
    body.u_image_path = this.display_Image;

    this.http
      .put('https://localhost:44301/api/Users/UpdateProfileUser', body)
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }
  uploadAttachment(file: FormData) {
    this.http
      .post(
        'https://localhost:44301/api/Users/UploadImageUser/UploadImageUser',
        file
      )
      .subscribe(
        (resp: any) => {
          if (resp) {
            this.display_Image = resp.u_image_path; //
            console.log(resp);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  GetUserById(id: number) {
    this.http
      .get('https://localhost:44301/api/Users/GetUserById/GetUserById/' + id)
      .subscribe((res) => {
        this.GetUserByIdDto = res;
        console.log(res);
      });
  }

 
  UpdateProfileUser(body: any) {
    body.u_image_path = this.display_Image_Profile;
    this.http
      .put(
        'https://localhost:44301/api/Users/UpdateProfileUser/UpdateProfile',
        body
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
 
  ChackPassword(body: any) {
    this.http
      .post(
        'https://localhost:44301/api/login/ChackPassword/Chackpassword',
        body
      )
      .subscribe(
        (res) => {
          this.Users = res;
          this.toastr.success('Password Changed', 'Success');
        },
        (err) => {
          this.toastr.error('Password Not Changed', 'Error');
        }
      );
  }
  CreateSubscripe(body: any) {
    this.http
      .post('https://localhost:44301/api/Subscription/InsertSubscription', body)
      .subscribe((res) => {
        this.UserSubscription = res;
        console.log(res);
      });
    // window.location.reload();
  }

  GetAllPostByChanel() {
    this.http
      .get('https://localhost:44301/api/Post/GetAllPostByChanel/chanel/3')
      .subscribe((res) => {
        this.post = res;
        console.log(res);
      });
  }

  InsertReportPost(body: any) {
    this.http
      .post('https://localhost:44301/api/PostReport/CreatePostReport', body)
      .subscribe((res) => {
        this.ReportPost = res;
        console.log(res);
      });
  }

  //qasem
  GetFullUserById(userId: number) {
    return this.http.get(
      'https://localhost:44301/api/Users/GetUserById/GetUserById/' + userId
    );
  }
  GetAllUserFriends(userId: number) {
   return this.http.get(
      'https://localhost:44301/api/Friends/GetUserFriends/' + userId
    );
  }

  GetUserFriendsChat(userToId: number) {
    let userFromId = +JSON.parse(localStorage.getItem('userData')).userid;
    return this.http.get(
      'https://localhost:44301/api/ChatMassage/GetUserFriendChat/' +
        userFromId +
        '/' +
        userToId
    );
  }
  GetCurrentUserId() {
    return +JSON.parse(localStorage.getItem('userData')).userid;
  }
  GetFullUserByConn(connId: string) {
    return this.http.get(
      'https://localhost:44301/api/Connection/GetItemByConn/' + connId
    );
  }
  GetUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('userData'));
  }
  RemoveUserFromLocalStorage() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  }

  Logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    this.router.navigate(['/auth/login']);
  }

  InsertTestimonial(body: any) {
    this.http
      .post('https://localhost:44301/api/Testimonial/InsertTestimonial', body)
      .subscribe((res) => {
        this.Users = res;
        console.log(res);
      });
  }

  insertStore(body: any) {
    this.http
      .post('https://localhost:44301/api/story/InsertStory', body)
      .subscribe((res) => {
        this.Story = res;
        console.log(res);
      });
  }

  searchGroup(data: any) {
    this.http
      .post(
        'https://localhost:44301/api/Groups/SearchGroupUserChannel/filturGroup',
        data
      )
      .subscribe((res) => {
        console.log(res);
        this.Groups = [res];
      });
  }

  GetAllGroups() {
    this.http
      .get('https://localhost:44301/api/Groups/GetAllAdminGroup')
      .subscribe((res) => {
        this.Groups = res;
        console.log(res);
      });
  }
}
