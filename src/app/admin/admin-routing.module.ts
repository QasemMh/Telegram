import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupComponent } from './group/group.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { StoryComponent } from './story/story.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'dashboard',
  component:DashboardComponent}
  ,
  {path:'managehome',
  component:ManageHomeComponent}
  ,
  {path:'story',
  component:StoryComponent},
  {path:'users',
  component:UserComponent}
  ,
  {path:'channels',
  component:ChannelComponent}
  ,
  {
    path:'groups',
    component:GroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
