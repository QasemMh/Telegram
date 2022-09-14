import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.component.html',
  styleUrls: ['./friends-request.component.css'],
})
export class FriendsRequestComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private tostr: ToastrService
  ) {}

  users: any;
  ngOnInit(): void {
    let currentUserId = this.userService.GetCurrentUserId();
    this.http
      .get(
        'https://localhost:44301/api/Friends/GetFriendshipRequests/' +
          currentUserId
      )
      .subscribe((res: any) => {
        this.users = res;
        console.log(res);
      });
  }

  Accept(evt: any, user: any) {
    evt.currentTarget.parentNode.remove();
    this.http
      .post('https://localhost:44301/api/Friends/AcceptFriendRequest', {
        userFromId: this.userService.GetCurrentUserId(),
        userToId: user.id,
      })
      .subscribe((res: any) => {
        this.tostr.info('You are now friends');
      });
  }
  Reject(evt: any, user: any) {
    evt.currentTarget.parentNode.remove();
    this.http
      .post('https://localhost:44301/api/Friends/DeleteFriendRequest', {
        userFromId: this.userService.GetCurrentUserId(),
        userToId: user.id,
      })
      .subscribe((res: any) => {
        this.tostr.info('You rejecte friend request');
        //this.tostr.info('You rejecte friend request');
      });
  }
}
