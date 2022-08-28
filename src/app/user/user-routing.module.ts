import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { UserprofileComponent }from './userprofile/userprofile.component';
const routes: Routes = [
  {path:'chat',
  component:ChatComponent}
  ,
  {path:'userprofile',
  component:UserprofileComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
