import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public dialog: MatDialog,public User :UserService) { }

  ngOnInit(): void {
  }
  insertStory = new FormGroup({
    content :new FormControl(),
    file_path :new FormControl(),
    user_id :new FormControl(8),
  })

  insertStore()
  {
   
    this.User.insertStore(this.insertStory.value);
  }
  // imageFiles: any[];
  // HandelFiles(evt: any) {
  //   let files = [...evt.currentTarget.files];
  //   this.imageFiles = files.map((file) => {});
  //   let arr: any = [];
  //   for (let index = 0; index < files.length; index++) {
  //     const file = files[index];
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     //
  //     reader.onload = () => {
  //       this.imageFiles.push(reader.result);
  //       this.ReadonlyFileData(file);
  //     };
      //

      
  //   }
  // }
  // ReadonlyFileData(file: any) {
  //   console.log(file);
  //   console.log(URL.createObjectURL(file));
  //   //try save to db
  // }
  uploadImage(file:any)
  {
    if(file.length==0)
    return ; 
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object 
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger
    this.User.uploadAttachment(formDate);
  }
 

}
