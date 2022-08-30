import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmailblockService {

  constructor( private  http :HttpClient ) { }
  GetAllBlockUserAndSendEmailDTO :any =[{}];
  GetAllBlockUserAndSendEmail(){
    
    this.http.get('https://localhost:44301/api/userBlockList/GetAllBlockUserAndSendEmail/infoBlock').subscribe((res)=>{
    this.GetAllBlockUserAndSendEmailDTO=res;
   
    })

  }
  EmailSend(id:number)
{
  this.http.get('https://localhost:44301/api/userBlockList/EmailSend/blocksendemail/'+id).subscribe((resp)=>{
   
  })
  window.location.reload();
}
}
