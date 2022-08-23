import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }


  hubConnrction:signalR.HubConnection | undefined;

  startConnection=()=>
  {
   this.hubConnrction=new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/toastr',
   {skipNegotiation:true,
    transport:signalR.HttpTransportType.WebSockets
  }).build();
this.hubConnrction.start()
.then(()=>{
  console.log('started');
}).catch(err=>console.log('error :'+err))
  }


  askServer(){
    this.hubConnrction?.invoke("askServer","hey").catch(err=>console.log("err :"+err))
  }

  askServerListener(){
    this.hubConnrction?.on("askServerResponse",(someText)=>{
    console.log(someText)

    })
  }
}
