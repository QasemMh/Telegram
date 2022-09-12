import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  allBlockedArr: any = [{}];
  allstory: any = [{}];
  currentlyBlocked: any = [{}];
  story:any= [{}];
  EmailSendBlockStory:any =[{}];
  constructor(public Admin :AdminService ,private http: HttpClient ,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.Admin.GetAllStory();
    this.GetAllStory();
  }

  GetAllStory()
  {

  this.http.get('https://localhost:44301/api/Story/GetAllStory').subscribe((res)=>{
  this.story=res;

  })
  }

  BlockStory(obj :any){
    let blockObj = {
      id: obj.id,
      content: obj.content,
      file_path: obj.file_path,
      user_id: obj.user_id,
      isBlocked: 1,
      user: obj.user,
      created_at: obj.created_at,

    };
    if (confirm('Are you sure to block ' + obj.content)) {
    }
    return this.http.put('https://localhost:44301/api/Story/UpdateStory', blockObj)
      .subscribe((res: any) => {
        if (res) {
          this.EmailSendBlockStory(obj.user_id);
          this.GetAllStory();
        }

        window.location.reload();
        this.toastr.success('Done Block', 'Success');
      });

  }


UnBlockstory(obj :any){
    let UnBlockObj = {
      id: obj.id,
      content: obj.content,
      file_path: obj.file_path,
      user_id: obj.user_id,
      isBlocked: 0,
      user: obj.user,
      created_at: obj.created_at,

    };
    if (confirm('Are you sure to unblock ' + obj.content)) {
    }
    return this.http.put('https://localhost:44301/api/Story/UpdateStory', UnBlockObj)
      .subscribe((res: any) => {
        if (res) {
          this.EmailSendBlockStory(obj.user_id);
          this.GetAllStory();
        }

        window.location.reload();
        this.toastr.success('Done UnBlock', 'Success');
      });
  }

 
  

  EmailSendStoryBlock(id:number)
  {
    this.http.get('https://localhost:44301/api/Users/sendstoreEmail/blockstore/'+id).subscribe((resp)=>{
     this.EmailSendBlockStory = resp;
    })

  }
}
