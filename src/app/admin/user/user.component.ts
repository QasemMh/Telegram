import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  contUser: any = [{}];
  allBlockedArr: any = [{}];
  allUsers: any = [{}];
  currentlyBlocked: any = [{}];
  constructor(public Admin: AdminService, private http: HttpClient,private spinner: NgxSpinnerService) {}
  EmailSenduserblockDTO:any={};


  ngOnInit(): void {
    this.GetAllUser();
    this.Admin.GetNumberOfUsers();
    this.GetNumberOfUsers();
  }

  GetAllUser() {
    this.Admin.GetAllUser().subscribe((res) => {
      this.allUsers = res;
      console.log(this.allUsers[0]);
    });
  }

  BlockUser(obj: any) {
    console.log('222', obj);

    let blockObj = {
      id: obj.id,
      first_name: obj.first_name,
      middle_name: obj.middle_name,
      last_name: obj.last_name,
      bio: obj.bio,
      gender: obj.gender,
      image_path: obj.image_path,
      created_at: obj.created_at,
      login_id: obj.login_id,
      is_blocked: 1,
    };
    if (confirm('Are you sure to block ' + obj.first_name)) {
      this.spinner.show();
    }
    return this.http
      .post('https://localhost:44301/api/Users/UpdateUsers', blockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.EmailSenduserblock(obj.id);
          this.GetAllUser();
          this.spinner.hide();
        }
      });
  }

  UnBlockUser(obj: any) {
    let UnblockObj = {
      id: obj.id,
      first_name: obj.first_name,
      middle_name: obj.middle_name,
      last_name: obj.last_name,
      bio: obj.bio,
      gender: obj.gender,
      image_path: obj.image_path,
      created_at: obj.created_at,
      login_id: obj.login_id,
      is_blocked: 0,
    };
    if (confirm('Are you sure to unblock ' + obj.first_name)) {
      this.spinner.show();
    }

    return this.http
      .post('https://localhost:44301/api/Users/UpdateUsers', UnblockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.EmailSenduserblock(obj.id);
          this.GetAllUser();
          this.spinner.hide();
        }
      });
  }
  EmailSenduserblock(id:number)
  {
    this.http.get('https://localhost:44301/api/Users/EmailSenduserblock/blockuser/'+id).subscribe((resp)=>{
     this.EmailSenduserblockDTO = resp;
    })
  }
  GetNumberOfUsers() {
    return this.http
      .get('https://localhost:44301/api/Users/NumberOfUser/NumberOfUser')
      .subscribe((res: any) => {
        this.contUser = res[0].countOfUser;
      });
  }
}
