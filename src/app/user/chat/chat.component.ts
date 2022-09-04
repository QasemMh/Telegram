import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { SignalrService } from 'src/app/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() userChat?: any;

  constructor(public signalr: SignalrService) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

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
        name: this.userChat.name,
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }
}
