import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})

export class PostCardComponent implements OnInit {
  
 
 postContant=''
  
  constructor(private admin:AdminService) { }

  ngOnInit(): void {

     this.admin.SharePostContant.subscribe(x=>this.postContant=x)
   debugger

     console.log(this.postContant)
   
  }

}
