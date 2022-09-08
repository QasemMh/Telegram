import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { ChatComponent } from './chat/chat.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MyorderComponent } from './myorder/myorder.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';
import { ChannelComponent } from './channel/channel.component';
import { PostComponent } from './post/post.component';


@NgModule({
   declarations: 
  [
    ChatComponent,
    CatalogComponent,
    MyorderComponent,
    CreateTestimonialComponent,
    ChannelComponent,
    PostComponent
 
  ],
  imports: 
  [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
