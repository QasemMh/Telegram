import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { StoryComponent } from './story/story.component';
import { ChannelComponent } from './channel/channel.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ManageHomeComponent,
    StoryComponent,
    ChannelComponent,
    UserComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
