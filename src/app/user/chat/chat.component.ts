import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { SignalrService } from 'src/app/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() userChat?: any;

  constructor(
    public signalrService: SignalrService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.signalrService.sendMessageToFriendLis();
    this.sendMessageToFriendLis();
  }

  ngOnDestroy() {}
  sendMessageToFriendLis() {
    this.signalrService.hubConnection.on(
      'sendMsgFriendResponse',
      (connId: any, msg: any) => {
        this.userService.GetFullUserByConn(connId).subscribe((res: any) => {
          this.userChat.userMessages.push({
            text: msg,
            date: new Date(),
            reply: false,
            type: 'text',
            user: {
              name: res.firstName + ' ' + res.lastName,
              avatar: res.imagePath,
            },
          });
        });
      }
    );
  }
  sendMessage(event: any) {
    const files = !event.files
      ? []
      : event.files.map((file: any) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    this.userChat.userMessages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: JSON.parse(localStorage.getItem('userData')!).userName,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    this.signalrService
      .sendMessageToFriendInv(
        this.userChat.connid,
        this.userChat.id,
        event.message
      )
      .then(() => {})
      .catch((err) => {
        this.toastr.error("Message can't be sent", 'Error');
      });
  }
}
