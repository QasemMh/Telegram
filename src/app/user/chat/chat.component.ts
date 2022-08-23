import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit ,OnDestroy{

  constructor( public signalr:SignalrService) { }
  

  ngOnInit(): void {
    this.signalr.startConnection();
setTimeout(() => {
  this.signalr.askServerListener();
  this.signalr.askServer();
  
}, 2000);
  }

  ngOnDestroy() {
    this.signalr.hubConnrction?.off("askServerResponse")
  }
  
}
