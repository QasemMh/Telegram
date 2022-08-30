import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Services:any=[{}];
  UserSubscription:any=[{}];
  constructor(private http :HttpClient) { }
  

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
}
