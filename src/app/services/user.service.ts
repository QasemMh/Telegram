
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 

    constructor(public http:HttpClient) { }
   GetUserByIdDto:any={};
   UpdateProfileUserDTO:any={}
   Users:any={}
    Services:any=[{}];
  UserSubscription:any=[{}];
  display_Image_Profile: any;
  CreateSubscripe(body:any)
  {
    this.http.post('https://localhost:44301/api/Subscription/InsertSubscription',body).subscribe((res)=>{
     
  })
  window.location.reload();
  }
  deleteSubscription(body:any)
  {
    this.http.delete('https://localhost:44301/api/Subscription/DeleteSubscription',body).subscribe((resp)=>{
      console.log(resp)
    },err=>{

    })
    window.location.reload();
  }

  GetAllServices()
  {

  this.http.get('https://localhost:44301/api/Services/GetAllSERVICES').subscribe((res)=>{
  this.Services=res;

  })
  }
  p_data:number= +localStorage.getItem('loginId');
  GetUserSubscription()
  {

  this.http.get('https://localhost:44301/api/Subscription/GetUserSubscription/'+this.p_data).subscribe((res)=>{
  this.UserSubscription=res;

  })
  }

 
  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44301/api/Users/UploadImageUser/UploadImageUser',file).subscribe
    ((resp:any)=>{
      if(resp)
      {     
        this.display_Image_Profile=resp.u_image_path;//
        console.log(resp);
  
      }
    },err=>{
      console.log(err);
      
    })
  }
  GetUserById(id:number)
  {

  this.http.get('https://localhost:44301/api/Users/GetUserById/GetUserById/'+id).subscribe((res)=>{
    this.GetUserByIdDto=res;
    console.log(res);
  })
}
UpdateProfileUser(body:any)
{
  body.u_image_path=this.display_Image_Profile;

  this.http.put('https://localhost:44301/api/Users/UpdateProfileUser/UpdateProfile',body).subscribe((res)=>{
    console.log(res);
})}

ChackPassword(body:any)
{
  this.http.post('https://localhost:44301/api/login/ChackPassword/Chackpassword',body).subscribe((res)=>{
     this.Users=res;
     console.log(res);
})
}

}
