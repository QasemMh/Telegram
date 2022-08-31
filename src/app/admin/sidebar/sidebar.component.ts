import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userData:any;
  constructor() { }
  items: NbMenuItem[] = [
    {
      title: "home",
      link: '/'
    },
    {
      title: "dashboard",
      link: 'dashboard'
    }
   ];
  ngOnInit(): void {
    this.userData=localStorage.getItem('userData');
    console.log(this.userData)

  }

}
