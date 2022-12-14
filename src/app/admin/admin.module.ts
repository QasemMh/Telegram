import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { StoryComponent } from './story/story.component';
import { ChannelComponent } from './channel/channel.component';
import { GroupComponent } from './group/group.component';

import { UserComponent } from './user/user.component';

import { RolesComponent } from './role/role.component';
import { BlockuserComponent } from './blockuser/blockuser.component';
import { ManagecatalogComponent } from './managecatalog/managecatalog.component';
import { SubscriptionComponent } from './subscription/subscription.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';

import { MangePostComponent } from './mange-post/mange-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ReportUsersComponent } from './report-users/report-users.component';

import { ProfileComponent } from './profile/profile.component';
import { UserActiveComponent } from './user-active/user-active.component';
import { PostProfileComponent } from './post-profile/post-profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/Interceptor/token.Interceptor';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ManageHomeComponent,
    StoryComponent,
    ChannelComponent,
    GroupComponent,

    BlockuserComponent,

    UserComponent,
    RolesComponent,
    ManagecatalogComponent,
    SubscriptionComponent,
    AdminComponent,
    HeaderComponent,
    MangePostComponent,
    CreatePostComponent,
    PostComponent,
    PostCardComponent,
    ReportUsersComponent,
    ProfileComponent,
    UserActiveComponent,
    PostProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AdminModule {}
