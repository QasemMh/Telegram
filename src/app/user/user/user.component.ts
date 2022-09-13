import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignalrService } from 'src/app/signalr.service';
import { Subject, Observable } from 'rxjs';
import { HubConnectionState } from '@microsoft/signalr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // userData: any;
  listenToEvent: boolean = true;
  userProfileSide: boolean = true;

  constructor(
    private readonly signalrService: SignalrService,
    public readonly userService: UserService,
    private spinner: NgxSpinnerService,
    private dialogService: NbDialogService
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
    this.spinner.show();

    this.userService.userChatData = null;
    this.userService.profileId = null;

    this.listenToEvent = false;
    let currentTarget = evt.event.currentTarget;
    let currentUserId = this.userService.GetCurrentUserId();
    this.userService.GetFullUserById(currentUserId).subscribe(
      (currentUser: any) => {
        this.userService.GetUserFriendsChat(evt.user.id).subscribe(
          (res: any) => {
            this.userService.userChatData = evt.user;
            this.userService.userChatData.userMessages = [];
            this.userService.userChatData.userMessages = res.map(
              (item: any) => {
                if (item.userFromId == currentUser.userId) {
                  return {
                    text: item.message,
                    date: new Date(item.datetime),
                    reply: true,
                    type: 'text',
                    files: [],
                    user: {
                      name:
                        currentUser.last_Name + ' ' + currentUser.first_Name,
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
              }
            );
            this.spinner.hide();
            this.changeActiveChat(currentTarget);
            this.listenToEvent = true;
          },
          (err) => {
            this.spinner.hide();
            this.listenToEvent = true;
          }
        );
      },
      (err) => {
        this.spinner.hide();
        this.listenToEvent = true;
      }
    );
  }
  changeActiveChat(currentTarget: any) {
    document.querySelectorAll('[data-user-item]').forEach((item) => {
      item.classList.remove('active');
      currentTarget.classList.add('active');
    });
  }
}
