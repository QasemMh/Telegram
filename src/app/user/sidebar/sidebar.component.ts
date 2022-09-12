import { SignalrService } from 'src/app/signalr.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  @Input() isActive: boolean = true;
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly signalrService: SignalrService
  ) {
    this.GetAllUserFriends();
  }

  ngOnInit(): void {
    this.userOffListener();
    this.userOnListener();
  }

  users: any[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  //on off
  userOnListener() {
    this.signalrService.hubConnection.on('UserOn', (data) => {
      this.RefreshUserFriends(data.userId, data.connectionId);
    });
  }
  userOffListener() {
    this.signalrService.hubConnection.on('UserOff', (data) => {
      this.RefreshUserFriends(data, null);
    });
  }
  HandleClickChat(data: any) {
    if (this.isActive) this.conversationClicked.emit(data);
  }

  GetAllUserFriends() {
    let userId = this.userService.GetCurrentUserId();
    this.userService.GetAllUserFriends(userId).subscribe((res: any[]) => {
      this.users = res.map((item) => {
        return {
          name: item.first_name + ' ' + item.last_name,
          id: item.id,
          connid: item.connectionId,
          avatar: item.image_path,
          title: 'friends',
          badgeStatus: item.connectionId ? 'success' : 'danger',
          badgeText: item.connectionId ? 'Online' : 'Offline',
        };
      });

      this.users.sort((a, b) => {
        return a.badgeStatus < b.badgeStatus ? 1 : -1;
      });
    });
  }
  RefreshUserFriends(userId: number, connId: string = null) {
    let userIndex = this.users.findIndex((x) => x.id == +userId);
    if (userIndex > -1) {
      this.users[userIndex].badgeStatus = connId ? 'success' : 'danger';
      this.users[userIndex].badgeText = connId ? 'Online' : 'Offline';
      this.users[userIndex].connid = connId;
      this.users.sort((a, b) => {
        return a.badgeStatus < b.badgeStatus ? 1 : -1;
      });
    }
  }
}
