import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userData: any;
  constructor( private router:Router) {}

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    console.log(this.userData);
  }



  items: NbMenuItem[] = [
    {
      title: 'profile',
      link: '/admin/profile',
    },
    {
      title: 'dashboard',
      link: '/admin/dashboard',
    },
    {
      title: 'Subscription',
      link: '/admin/sub',
    },
    {
      title: 'User Block',
      link: '/admin/user',
    },
    {
      title: 'Story Block',
      link: '/admin/story',
    },
    {
      title: 'Mange Service',
      link: '/admin/cataloge',
    },
    {
      title: 'Manage Home',
      link: '/admin/managehome',
    },
    {
      title: 'Mange groups',
      link: '/admin/groups',
    },
   
    {
      title: 'All Post',
      link: '/admin/Post',
    },
    {
      title: 'Report Users',
      link: '/admin/Report',
    },
    {

      title: 'User Active',
      link: '/admin/useractive',

      title: 'Block User',
      link: '/admin/blockuser',

    },


  ];
}
