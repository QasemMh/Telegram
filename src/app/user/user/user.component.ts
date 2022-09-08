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
  constructor(private readonly signalrService: SignalrService) {}

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

    //get all message between user.id and current user;
    //this.userData.userMessages = [];

    this.changeActiveChat(evt.event);
  }
  changeActiveChat(evt: any) {
    document.querySelectorAll('[data-user-item]').forEach((item) => {
      item.classList.remove('active');
      evt.currentTarget.classList.add('active');
    });
  }
}
