import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  AboutUs:any=[{}];
  HomePage:any=[{}];
  ContactUs:any=[{}];
  AcceptTestimonial:any=[{}];
  display_Image:any;
  constructor(private http :HttpClient) { }
  Testimonials:any=[{}];
  AllPost:any=[{}];





  GetAllTestimonial()
  {

  return this.http.get('https://localhost:44301/api/Testimonial/GetAllTestimonialUser')
  }
  GetAcceptTestimonial()
  {

  this.http.get('https://localhost:44301/api/Testimonial/GetAcceptTestimonial').subscribe((res)=>{
  this.AcceptTestimonial=res;
   //console.log(this.HomePage)
  })
  }
  UpdateTestimonial(body:any)
  {

    this.http.put('https://localhost:44301/api/Testimonial/UpdateTestimonial',body).subscribe((resp)=>{

    },err=>{

    })
    window.location.reload();
  }

  getHomeInfo()
  {

  this.http.get('https://localhost:44301/api/HomePage/GetHomeInfo/Home').subscribe((res)=>{
  this.HomePage=res;
   //console.log(this.HomePage)
  })
  }
  getAboutUsInfo()
  {
    this.http.get('https://localhost:44301/api/HomePage/GetAboutUsInfo/AboutUs').subscribe((res)=>{
    this.AboutUs=res;
  })
}
getAllContact()
{
  this.http.get('https://localhost:44301/api/HomePage/GetAllContactUs/ContactUs').subscribe((res)=>{
  this.ContactUs=res;
})
}

UpdateHome (body:any)
{

  body.img=this.display_Image;
  this.http.put('https://localhost:44301/api/HomePage/UpdateHome',body).subscribe((resp)=>{

  },err=>{

  })
  window.location.reload();
}
uploadAttachment(file:FormData)
{
  this.http.post('https://localhost:44301/api/HomePage/UploadImageHome',file).subscribe
  ((resp:any)=>{
    if(resp)
    {
      this.display_Image=resp.img;//
      console.log(resp);

    }
  },err=>{
    console.log(err);

  })
}
createContact(body:any){//form group --> create form

 // body.imagename=this.display_Image;
  this.http.post('https://localhost:44301/api/HomePage/InsertContactUs',body).subscribe((resp)=>{
   console.log(resp)
  },err=>{

  })
}
deleteContactUs(id:number)
{
  this.http.delete('https://localhost:44301/api/HomePage/deleteContactUs/deleteContactUs/'+ id).subscribe((resp)=>{
    console.log(resp)
  },err=>{

  })
  window.location.reload();
}
UpdateAboutUs (body:any)
{

  body.img=this.display_Image;
  this.http.put('https://localhost:44301/api/HomePage/UpdateAboutUs',body).subscribe((resp)=>{

  },err=>{

  })
  window.location.reload();
}
uploadAboutAttachment(file:FormData)
{
  debugger;
  this.http.post('https://localhost:44301/api/HomePage/UploadImageAboutUs',file).subscribe
  ((resp:any)=>{
    if(resp)
    {
      this.display_Image=resp.img;//
      console.log(resp);

    }
  },err=>{
    console.log(err);

  })
}

}


