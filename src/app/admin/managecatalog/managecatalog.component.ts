import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-managecatalog',
  templateUrl: './managecatalog.component.html',
  styleUrls: ['./managecatalog.component.css']
})
export class ManagecatalogComponent implements OnInit {
  @ViewChild('callCreateServicesDailog') callCreateServicesDailog! :TemplateRef<any>;
  @ViewChild('callDeleteServicesDailog') callDeleteServicesDailog! :TemplateRef<any>;
  @ViewChild('callUpdateServicesDailog') callUpdateServicesDailog! :TemplateRef<any>;




  createFormServices:FormGroup = new FormGroup({

    name:new FormControl('',Validators.required),
    descriptions:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    image:new FormControl()
  })





  updateFormServices:FormGroup = new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    descriptions:new FormControl(),
    price:new FormControl(),
   //createtime:new FormControl(),
    image:new FormControl()
  })
  constructor(public dialog: MatDialog,public Admin :AdminService) { }

  ngOnInit(): void {
    this.Admin.GetAllServices();
  }


  p_data:any={};
  updateDailog(obj:any){
    this.p_data={
    id:obj.id,
    name:obj.name,
    descriptions:obj.descriptions,
    price:obj.price,
    image:obj.image
    }
    console.log(this.p_data);
    this.updateFormServices.controls['id'].setValue(this.p_data.id);

    this.dialog.open(this.callUpdateServicesDailog)

  }

  updateServices(){

    this.Admin.UpdateService(this.updateFormServices.value);
  }


  Createdialog(){
  this.dialog.open(this.callCreateServicesDailog)
  }



  CreateServices(){
  console.log(this.createFormServices.value);
  this.Admin.CreateService(this.createFormServices.value);
  }
  uploadImage(file:any)
  {
    if(file.length==0){
    return ;}
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger
    this.Admin.UploadImageService(formDate);
  }

  deleteServices(id:number)
  {


    const dialogVal= this.dialog.open(this.callDeleteServicesDailog);
    dialogVal.afterClosed().subscribe((res)=>{
      if(res!=undefined)
        {
          if (res=='yes')
          this.Admin.DeleteService(id);
          
        else (res=='no')
           console.log("Thank you");
        }

    })





  }
}
