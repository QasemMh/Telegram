import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private readonly sidebarService: NbSidebarService ,private router:Router) { }
  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;

  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
  ngOnInit(): void {
  }

}
