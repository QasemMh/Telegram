import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-report-users',
  templateUrl: './report-users.component.html',
  styleUrls: ['./report-users.component.css']
})
export class ReportUsersComponent implements OnInit {
  allBlockedArr: any = [{}];
  allstory: any = [{}];
  currentlyBlocked: any = [{}];
  Report:any= [{}]
  constructor(private http: HttpClient ,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.GetAllReport();
  }




  GetAllReport()
  {

  this.http.get('https://localhost:44301/api/PostReport/GetAllReportPost').subscribe((res)=>{
  this.Report=res;
  console.log(this.Report)

  })
  }

  Regect(obj :any){
    let blockObj = {
      id: obj.reportID,
      user_from:obj.fromUser,
      // user_to :obj.user_to,
      post_id: obj.postID,
      type: obj.repoType,
      description: obj.repodescription,
      is_accept:1,

    };
    if (confirm('Are you sure to Regect ' + obj.post_id + "And Type Report " + obj.type +"Descrbtion :" +  obj.description)) {
      this.spinner.show();
    }

    return this.http.put('https://localhost:44301/api/PostReport/UpdatePostReport', blockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.GetAllReport();
          this.spinner.hide();
        }
        console.log("blockObj",blockObj);
        window.location.reload();
        this.toastr.success('Done Regect', 'Success');

      });


  }


Accept(obj :any){
    let UnBlockObj = {
      id: obj.reportID,
      user_from:obj.fromUser,
      // user_to :obj.user_to,
      post_id: obj.postID,
      type: obj.repoType,
      description: obj.repodescription,
      is_accept:0,

    };
    if (confirm('Are you sure to Acccpt ' + obj.post_id + "And Type Report " + obj.type +"Descrbtion :" +  obj.description)) {
      this.spinner.show();
    }
    return this.http.put('https://localhost:44301/api/PostReport/UpdatePostReport', UnBlockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.GetAllReport();
          this.spinner.hide();
        }

        window.location.reload();
        this.toastr.success('Done Accpet', 'Success');
      });
  }
}






