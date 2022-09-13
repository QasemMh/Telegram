import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-active',
  templateUrl: './user-active.component.html',
  styleUrls: ['./user-active.component.css']
})
export class UserActiveComponent implements OnInit {

  constructor(public Admin: AdminService) { }

  ngOnInit(): void {
    this.Admin.GetUserActive();
    this.Admin.GetUserNotActive();
  }

}
