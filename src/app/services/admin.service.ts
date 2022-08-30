import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  countOfUsers : any=[{}] ;
  story:any=[{}];
  display_Image:any;
  Channels:any=[{}];
  Users:any=[{}];
  Groups:any=[{}];
  Testimonials:any=[{}];
  constructor(private http :HttpClient) { }
  GetAllTestimonial()
  {

  this.http.get('https://localhost:44301/api/Testimonial/GetAllTestimonial').subscribe((res)=>{
  this.Testimonials=res;
   //console.log(this.HomePage)
  })
  }

  UpdateTestimonial (body:any)
  {

  //body.img=this.display_Image;
  this.http.put('https://localhost:44301/api/HomePage/UpdateAboutUs',body).subscribe((resp)=>{

  },err=>{

  })
  window.location.reload();
}

  GetAllGroups()
  {

  this.http.get('https://localhost:44301/api/Groups').subscribe((res)=>{
  this.Groups=res;

  })
  }

  BlockUser(id :number)
  {
    return this.http.post('https://localhost:44301/api/Users/AdminBlock/AdminBlock/'+id , '')
  }

  GetAllUser()
  {

  return this.http.get('https://localhost:44301/api/Users/GetAllUsers')

  }

  getAllBlocked()
  {
    return this.http.get('https://localhost:44301/api/Users/GetAllUsersBlocked/AdminBlockList')
  }

  GetNumberOfUsers()
  {

  this.http.get('https://localhost:44301/api/Users/NumberOfUser/NumberOfUser').subscribe((res)=>{
  this.countOfUsers=res;

  })
  }

  GetAllChannel()
  {

  this.http.get('https://localhost:44301/api/Channel/GetAllChannel').subscribe((res)=>{
  this.Channels=res;

  })
  }

  GetAllStory()
  {

  this.http.get('https://localhost:44301/api/Story/GetAllStory').subscribe((res)=>{
  this.story=res;

  })
  }
  UploadImageStory(file:FormData)
  {
    this.http.post('https://localhost:44301/api/Story/UploadImageStory',file).subscribe
    ((resp:any)=>{
      if(resp)
      {
        this.display_Image=resp.file_path;//
        console.log(resp);

      }
    },err=>{
      console.log(err);

    })
  }
  UserInfo(body:any)
  {

  this.http.post('https://localhost:44301/api/Story/UserInfo',body).subscribe((res)=>{
  this.story=res;

  })
  }
}
