
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

  GetUserSubscription()
  {

  this.http.get('https://localhost:44301/api/Subscription/GetUserSubscription/8').subscribe((res)=>{
  this.UserSubscription=res;

  })
  }

 
  GetUserById()
  {

  this.http.get('https://localhost:44301/api/Users/GetUserById/GetUserById/9').subscribe((res)=>{
    this.GetUserByIdDto=res;
    console.log(res);
    })
}
UpdateProfileUser(body:any)
{
  this.http.put('https://localhost:44301/api/Users/UpdateProfileUser/UpdateProfile',body).subscribe((res)=>{
     this.UpdateProfileUserDTO=res;
     console.log(res);
})
}
ChackPassword(body:any)
{
  this.http.post('https://localhost:44301/api/login/ChackPassword/Chackpassword',body).subscribe((res)=>{
     this.Users=res;
     console.log(res);
})
}

}
