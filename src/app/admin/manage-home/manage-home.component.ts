import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  constructor(public dialog: MatDialog ,public home :HomeService) { }
  @ViewChild('callHomeupdateDailog') callHomeupdateDailog! :TemplateRef<any>;
  @ViewChild('callAboutupdateDailog') callAboutupdateDailog! :TemplateRef<any>;

  @ViewChild('calldeleteDailog') calldeleteDailog! :TemplateRef<any>;
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
    img :new FormControl(),
    email:new FormControl(),
    phone:new FormControl(),
    address:new FormControl(),

  })
  ngOnInit(): void {
    
    this.home.getHomeInfo();
    this.home.getAboutUsInfo();
    this.home.getAllContact();
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
    contant:obj.logo
    }
    console.log(this.About_data);
    this.updateAboutUsForm.controls['id'].setValue(this.About_data.id); 
    
    this.dialog.open(this.callAboutupdateDailog)
    
  }
  UpdateAbout(){
    debugger
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
    debugger
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
}
