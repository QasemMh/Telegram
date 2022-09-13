import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { ChatComponent } from './chat/chat.component';
import { CatalogComponent } from './catalog/catalog.component';
import { MyorderComponent } from './myorder/myorder.component';
import { CreateTestimonialComponent } from './create-testimonial/create-testimonial.component';

import { ChannelComponent } from './channel/channel.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostComponent } from './post/post.component';
 import { GroupComponent } from './group/group.component';
import { ProfileComponent } from './profile/profile.component';
 import { StoreComponent } from './store/store.component';
import { SearchComponent } from './search/search.component';




@NgModule({
  declarations: [
    ChatComponent,
    CatalogComponent,
    MyorderComponent,
    CreateTestimonialComponent,
    ChannelComponent,
     UserComponent,
    HeaderComponent,
    SidebarComponent,
    PostComponent,
    GroupComponent,
    UserprofileComponent,
    ProfileComponent,
    StoreComponent,
    SearchComponent
   ],
  imports:
  [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]

})
export class UserModule {}
