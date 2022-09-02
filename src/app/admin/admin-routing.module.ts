import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManagecatalogComponent } from './managecatalog/managecatalog.component';
import { RolesComponent } from './role/role.component';
import { StoryComponent } from './story/story.component';
 import { BlockuserComponent } from './blockuser/blockuser.component';


 import { UserComponent } from './user/user.component';

import { SubscriptionComponent } from './subscription/subscription.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      }
      ,
      {
        path:'profile',
        component:ProfileComponent
      }
      ,
      {path:'managehome',
      component:ManageHomeComponent}
      ,
      {path:'cataloge',
      component:ManagecatalogComponent}
      ,
      {path:'story',
      component:StoryComponent
      },
      {path:'channels',
      component:ChannelComponent}
      ,
      {
        path:'groups',
        component:GroupComponent
      },
      {
        path:'role',
        component:RolesComponent
      },
      {
      path:'blockuser',
      component:BlockuserComponent },
      {
          path:'user',
        component:UserComponent
      },{
        path:'sub',
        component:SubscriptionComponent

       },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
