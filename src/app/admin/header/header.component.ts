import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private readonly sidebarService: NbSidebarService) { }
  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;

  }
  ngOnInit(): void {
  }

}
