import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  constructor(public dialog: MatDialog ,public home :HomeService,private http: HttpClient ,private toastr: ToastrService,private spinner: NgxSpinnerService) { }
  allTesti:any=[{}]
  @ViewChild('callHomeupdateDailog') callHomeupdateDailog! :TemplateRef<any>;
  @ViewChild('callAboutupdateDailog') callAboutupdateDailog! :TemplateRef<any>;
  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;
  @ViewChild('callTestimonialUpdateDailog') callTestimonialUpdateDailog! :TemplateRef<any>;
 // //AboutUsInfo
//   @Input()id :number|undefined
//   @Input()img :string|undefined
//   @Input()contant :string|undefined

//   //HomeInfo
//   @Input()name :string|undefined
//   @Input()logo :string|undefined
//   @Input()email :string|undefined
//   @Input()phone :string|undefined
//   @Input()address :string|undefined


  updateAboutUsForm:FormGroup=new FormGroup({
    id:new FormControl(),
    img:new FormControl(),
    contant:new FormControl()
  })

  updateHomeForm:FormGroup=new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    logo:new FormControl(),
    img :new FormControl(),
    email:new FormControl(),
    phone:new FormControl(),
    address:new FormControl()
  })

  updateTestimonialForm:FormGroup=new FormGroup({
    id:new FormControl(),
    user_from:new FormControl(),
    description :new FormControl(),
    is_accept :new FormControl()
  })


  Testimonial_data:any={};


   Accepting(obj:any){
    this.Testimonial_data={
    id:obj.id,
    user_from:obj.user_from,
    description:obj.description,
    is_accept:obj.is_accept
    }
    console.log(this.Testimonial_data);
    this.updateTestimonialForm.controls['id'].setValue(this.Testimonial_data.id);
    this.updateTestimonialForm.controls['user_from'].setValue(this.Testimonial_data.user_from);

    this.dialog.open(this.callTestimonialUpdateDailog)

  }



  UpdateTestimonial(){
    this.home.UpdateTestimonial(this.updateTestimonialForm.value);
  }
  ngOnInit(): void {

    this.home.getHomeInfo();
    this.home.getAboutUsInfo();
    this.home.getAllContact();
    this.GetAllTestimonial();
    this.GetAlltesta();
  }

  GetAllTestimonial(){
    return this.http.get('https://localhost:44301/api/Testimonial/GetAllTestimonialUser').subscribe((res :any) =>
    {
      this.allTesti=res
    })
  }


  UploadImageAboutUs(file:any)
  {
    if(file.length==0)
    return ;
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger
    this.home.uploadAboutAttachment(formDate);
  }
  About_data:any={};
  updateAboutDailog(obj:any){
    this.About_data={
    id:obj.id,
    img:obj.img,
    contant:obj.contant
    }
    console.log(this.About_data);
    this.updateAboutUsForm.controls['id'].setValue(this.About_data.id);

    this.dialog.open(this.callAboutupdateDailog)

  }
  UpdateAbout(){
    // debugger
    this.home.UpdateAboutUs(this.updateAboutUsForm.value);
  }
  uploadImage(file:any)
  {
    if(file.length==0)
    return ;
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger
    this.home.uploadAttachment(formDate);
  }
  Home_data:any={};
  updateHomeDailog(obj:any){
    this.Home_data={
    id:obj.id,
    name:obj.name,
    logo:obj.logo,
    img:obj.img,
    email:obj.email,
    phone:obj.phone,
    address:obj.address
    }
    console.log(this.Home_data);
    this.updateHomeForm.controls['id'].setValue(this.Home_data.id);

    this.dialog.open(this.callHomeupdateDailog)

  }
  UpdateHome(){
    this.home.UpdateHome(this.updateHomeForm.value);
  }
  deleteContactUs(id:number)
  {

    const dialogVal= this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe((res)=>{
      if(res!=undefined)
        {
          if (res=='yes')
          this.home.deleteContactUs(id);

        else (res=='no')
           console.log("Thank you");
        }
    })

  }




  // allAccpetdArr: any = [{}];
  // alltesta: any = [{}];
  // currentlyBlocked: any = [{}];
  testamonial:any= [{}]


  // "id": 3,
  // "user_from": 11,
  // "description": "string",
  // "is_accept": 0,
  // "users": null
  GetAlltesta()
  {

  this.http.get('https://localhost:44301/api/Testimonial/GetAllTestimonialUser').subscribe((res)=>{
  this.testamonial=res;

  })
  }

  Blocktestamonail(obj :any){
    console.log("tesst",obj);

    let blockObj = {
      id :obj.testaID,
      // testaID:obj.testaID,
      user_from :obj.id ,
      // first_name:obj.first_name,
      // last_name:obj.last_name,
      // image_path :obj.image_path,
      description: obj.description,
      is_accept: 1,
    };
    if (confirm('Are you sure to block ' + obj.description + "from User" + obj.first_name)) {
      this.spinner.show();
    }

    return this.http.put('https://localhost:44301/api/Testimonial/UpdateTestimonial', blockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.GetAlltesta();
          this.spinner.hide();
          this.toastr.success('Done Block', 'Success');

        }

          // console.log("blockObj",blockObj);



        // this.toastr.success('Done Block', 'Success');

      });


  }


  UnBlocktestamonail(obj :any){
    console.log(obj);

    let UnBlockObj = {
      id :obj.testaID,
      // testaID:obj.testaID,
      user_from :obj.id ,
      // first_name:obj.first_name,
      // last_name:obj.last_name,
      // image_path :obj.image_path,
      description: obj.description,
      is_accept: 0,
    };
    if (confirm('Are you sure to unblock ' + obj.description + "from User" + obj.user_from)) {
      this.spinner.show();
    }
    return this.http.put('https://localhost:44301/api/Testimonial/UpdateTestimonial', UnBlockObj)
      .subscribe((res: any) => {
        if (res) {
          this.spinner.show();
          this.GetAlltesta();
          this.spinner.hide();
        }
        console.log("blockObj",UnBlockObj);
      //  window.location.reload();
        this.toastr.success('Done UnBlock', 'Success');
      }
      );

  }




















}
