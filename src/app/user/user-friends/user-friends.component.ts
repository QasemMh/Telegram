import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css'],
})
export class UserFriendsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  users: any;
  ngOnInit(): void {
    this.spinner.show();
    this.http.get('https://localhost:44301/api/Users/GetAllUsers').subscribe(
      (res: any[]) => {
        let currentUserId = this.userService.GetCurrentUserId();
        this.userService
          .GetAllUserFriends(currentUserId)
          .subscribe((res2: any) => {
            let friends = res2.map((item) => item.id);
            this.users = res.filter(
              (item) => item.id != currentUserId && !friends.includes(item.id)
            );
            this.spinner.hide();
            this.users = res;
          });
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  addFriend(evt: any, user: any) {
    let currentUserId = this.userService.GetCurrentUserId();
    this.http
      .post('https://localhost:44301/api/Friends/InsertFriendRequest', {
        userFromId: currentUserId,
        userToId: user.id,
      })
      .subscribe(
        (res) => {
          this.toastr.success('Friend request sent successfully');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
