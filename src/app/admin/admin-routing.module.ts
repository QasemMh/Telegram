import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { RolesComponent } from './role/role.component';
import { StoryComponent } from './story/story.component';
import { BlockuserComponent } from './blockuser/blockuser.component';

const routes: Routes = [
  {path:'dashboard',
  component:DashboardComponent}
  ,
  {path:'managehome',
  component:ManageHomeComponent}
  ,
  {path:'story',
  component:StoryComponent},
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
  component:BlockuserComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
