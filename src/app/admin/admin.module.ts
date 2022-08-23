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
import { RolesComponent } from './role/role.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ManageHomeComponent,
    StoryComponent,
    ChannelComponent,
    GroupComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
