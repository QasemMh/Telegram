import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { NbSidebarService } from '@nebular/theme';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignalrService } from 'src/app/signalr.service';
//import { HubConnectionState } from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userData: any;
  constructor(
    private readonly signalrService: SignalrService,
    private readonly userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
    if (
      this.signalrService.hubConnection.state == HubConnectionState.Connected
    ) {
       // this.getUsersList();
    } else {
      this.signalrService.ssObs().subscribe((obj: any) => {
        if (obj.type == 'HubConnStarted') {
          //  this.getUsersList();
        }
      });
    }
  }

  onconversationClicked(evt: any) {
    this.userData = evt.user;
    this.userData.userMessages = [];

    let currentUserId = +JSON.parse(localStorage.getItem('userData')).userid;
    this.userService.GetFullUserById(currentUserId).subscribe(
      (currentUser: any) => {
        this.spinner.show();
        this.userService.GetUserFriendsChat(evt.user.id).subscribe(
          (res: any) => {
            this.userData.userMessages = res.map((item: any) => {
              if (item.userFromId == currentUser.userId) {
                return {
                  text: item.message,
                  date: new Date(item.datetime),
                  reply: true,
                  type: 'text',
                  files: [],
                  user: {
                    name: currentUser.last_Name + ' ' + currentUser.first_Name,
                    avatar: currentUser.images,
                  },
                };
              } else {
                return {
                  text: item.message,
                  date: new Date(item.datetime),
                  reply: false,
                  type: 'text',
                  files: [],
                  user: {
                    name: evt.user.name,
                    avatar: evt.user.avatar,
                  },
                };
              }
            });
            this.spinner.hide();
          },
          (err) => {
            this.spinner.hide();
          }
        );
      },
      (err) => {
        this.spinner.hide();
      }
    );
    this.changeActiveChat(evt.event);
  }
  changeActiveChat(evt: any) {
    document.querySelectorAll('[data-user-item]').forEach((item) => {
      item.classList.remove('active');
      evt.currentTarget.classList.add('active');
    });
  }
}
