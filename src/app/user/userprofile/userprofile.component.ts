import { NbSidebarService } from '@nebular/theme';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  @ViewChild('callUpdateDailog') callUpdateDailog!: TemplateRef<any>;
  @ViewChild('callUpdateProfileDailog')
  callUpdateProfileDailog!: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    public User: UserService,
    private readonly sidebarService: NbSidebarService
  ) {}
  UpdateProfileUsers = new FormGroup({
    u_id: new FormControl(),
    u_first_name: new FormControl(),
    u_middle_name: new FormControl(),
    u_last_name: new FormControl(),
    u_image_path: new FormControl(),
    u_gender: new FormControl(),
    l_email: new FormControl(),
    l_phone: new FormControl(),
  });
  chackPasswords = new FormGroup({
    loginId: new FormControl(this.User.GetUserFromLocalStorage().loginId),
    oldPassword: new FormControl(),
    newPassword: new FormControl(),
  });

  insertReview = new FormGroup({
    user_from: new FormControl(+this.User.GetUserFromLocalStorage().userid),
    description: new FormControl(),
    is_accept: new FormControl(0),
  });
  ngOnInit(): void {
    console.log(this.User.GetUserFromLocalStorage());

    this.User.GetUserById(+this.User.GetUserFromLocalStorage().userid);

    console.log(this.User.GetUserByIdDto);
  }
  uploadImage(file: any) {
    if (file.length == 0) return;
    let fileToUpload = <File>file[0]; //
    const formDate = new FormData(); //object
    formDate.append('file', fileToUpload, fileToUpload.name);
    // debugger
    this.User.uploadAttachment(formDate);
  }
  p_data: any;
  updateDailog(obj: any) {
    let User : any = localStorage.getItem("userData");
    User =JSON.parse(User);
    let uid : number =  +User.userid;
    this.p_data = {
      u_id:uid,
      u_first_name: obj.first_Name,
      u_middle_name: obj.middle_Name,
      u_last_name: obj.last_Name,

      u_image_path: obj.images,
      u_gender: obj.gender,
      l_email: obj.email,
      l_phone: obj.phone,
    };

    this.UpdateProfileUsers.controls['u_id'].setValue(+this.User.GetUserFromLocalStorage().userid);
    this.dialog.open(this.callUpdateProfileDailog);
   }

  UpdateProfileUser() {
     this.User.UpdateProfileUser(this.UpdateProfileUsers.value);
    console.log(this.UpdateProfileUsers.value);
  }
  ChackPassword() {
    this.User.ChackPassword(this.chackPasswords.value);
  }

  toggleSidebar() {
    this.User.userProfileSide = !this.User.userProfileSide;
    this.sidebarService.toggle(false, 'profile-sidebar');
  }

  InsertTestimonial() {
    this.User.InsertTestimonial(this.insertReview.value);
  }
}
