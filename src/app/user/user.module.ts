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
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/Interceptor/token.Interceptor';

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
    SearchComponent,
    UserFriendsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class UserModule {}
