import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  story:any=[{}];
  display_Image:any;
  Channels:any=[{}];
  Users:any=[{}];
  Groups:any=[{}];
  Testimonials:any=[{}];

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
  constructor(private http :HttpClient) { }
  GetAllGroups()
  {
    
  this.http.get('https://localhost:44301/api/Groups').subscribe((res)=>{
  this.Groups=res;
  
  })
  }

  GetAllUser()
  {
    
  this.http.get('https://localhost:44301/api/Users/GetAllUsers').subscribe((res)=>{
  this.Users=res;
  
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
