import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Input() profileId: any;
  profile: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.profileId) {
      this.userService.GetFullUserById(this.profileId).subscribe((res: any) => {
        this.profile = res;
      });
    }
  }
}
