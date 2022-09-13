import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class SignalrService implements OnInit {
  ssSubj = new Subject<any>();
  ssObs(): Observable<any> {
    return this.ssSubj.asObservable();
  }

  constructor(
    private readonly userService: UserService,
    private router: Router,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {}

  hubConnection: signalR.HubConnection | undefined;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44301/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,

        accessTokenFactory: () => <string>localStorage.getItem('userToken'),
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connected...');
        this.ssSubj.next({ type: 'HubConnStarted' });
        this.sendMessageListener();
        this.sendMessageInv();
      })
      .catch((err) => {
        console.log('Hub Connection Error...');
        console.log(new Error(err));
      //  this.router.navigate(['/home']);
        this.toastr.error('Hub Connection Error...','Error');
      });
  }

  //test connection
  sendMessageListener() {
    this.hubConnection.on('SendMessageRespons', (data: any) => {
      console.log(data);
    });
  }
  async sendMessageInv() {
    await this.hubConnection
      .invoke('SendMessage', 'Hello from Angular')
      .catch((err) => console.error(err));
  }

  //send message

  async sendMessageToFriendInv(connId: string, id: number, msg: string) {
    await this.hubConnection.invoke('SendMessageToFriend', connId, id, msg);
  }

  //
}
