import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ChatComponent } from './chat/chat.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MyorderComponent } from './myorder/myorder.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';


@NgModule({
  declarations: 
  [
    ChatComponent,
    CatalogComponent,
    MyorderComponent,
    CreateTestimonialComponent
  ],
  imports: 
  [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
