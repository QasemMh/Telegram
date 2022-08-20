import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';

const routes: Routes = [
  {path:'dashboard',
  component:DashboardComponent}
  ,
  {path:'managehome',
  component:ManageHomeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
