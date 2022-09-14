import { FriendsRequestComponent } from './../friends-request/friends-request.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {
  NbDialogService,
  NbMenuService,
  NbSearchService,
  NbSidebarService,
  NB_WINDOW,
} from '@nebular/theme';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly sidebarService: NbSidebarService,
    private searchService: NbSearchService,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private userService: UserService,
    private router: Router,
    private dialogService: NbDialogService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log('Search: ', data.term);
    });
  }

  userProfileName: string;
  userProfilePicture: string;
  items = [
    { title: 'Profile' },
    { title: 'Friends-request' },
    { title: 'Logout' },
  ];

  ngOnInit(): void {
    let userId = this.userService.GetUserFromLocalStorage().userid;
    this.userService.GetFullUserById(userId).subscribe((res: any) => {
      this.userProfileName = res.first_Name + ' ' + res.last_Name;
      this.userProfilePicture = res.images;
    });
    this.nbMenuService.onItemClick().subscribe((bag: any) => {
      if (bag.tag == 'my-context-menu')
        if (bag.item.title == 'Logout') {
          this.Logout();
        } else if (bag.item.title == 'Profile') {
          this.userService.userProfileSide = !this.userService.userProfileSide;
        } else if (bag.item.title == 'Friends-request') {
          this.openFriendsDialog();
        }
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, 'main-sidebar');
  }

  Logout() {
    this.userService.Logout();
  }

  openFriendsDialog() {
    this.dialogService.open(FriendsRequestComponent);
  }
}
