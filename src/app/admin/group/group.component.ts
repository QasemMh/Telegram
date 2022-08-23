import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  
  constructor(public Admin :AdminService) { }

  ngOnInit(): void {
    this.Admin.GetAllGroups();
  }

}
