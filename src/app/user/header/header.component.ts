import { NbSearchService, NbSidebarService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly sidebarService: NbSidebarService,
    private searchService: NbSearchService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      console.log('Search: ', data.term);
    });
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
