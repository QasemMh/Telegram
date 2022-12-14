import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.profileId) {
      this.userService.GetFullUserById(this.profileId).subscribe((res: any) => {
        this.profile = res;
        console.log(res);
      });
    }
  }

  DeleteFriend() {
    let userId = this.userService.GetCurrentUserId();
    this.userService
      .DeleteFriend({
        userFromId: userId,
        userToId: this.profileId,
      })
      .subscribe(
        (res) => {
          this.toastr.success('Friend deleted successfully');
          location.reload();
        },
        (err) => {
          this.toastr.error('Error deleting friend');
        }
      );
  }
}
