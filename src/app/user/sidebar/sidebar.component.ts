import { AdminService } from 'src/app/services/admin.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();

  constructor(private readonly adminService: AdminService) {
    this.adminService.GetAllUser().subscribe((res: any[]) => {
      this.users = res.map((item) => {
        return {
          name: item.first_name + ' ' + item.last_name,
          id: item.id,
        };
      });
    });
  }

  ngOnInit(): void {}

  users: any[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
}
