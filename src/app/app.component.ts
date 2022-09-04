import { SignalrService } from 'src/app/signalr.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Telegram';

  constructor(private readonly signalrService: SignalrService) {}

  ngOnInit(): void {
    this.signalrService.startConnection();
  }
  ngOnDestroy(): void {}
}
