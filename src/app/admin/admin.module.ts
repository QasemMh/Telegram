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
 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import HammerModule from "@egjs/hammerjs";

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
    ProfileComponent,
 
 
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    // MatSlideToggleModule,
   // BrowserAnimationsModule
  ]
  // , providers: [ HammerModule ] 
})
export class AdminModule { }
