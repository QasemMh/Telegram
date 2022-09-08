import { UserComponent } from './user/user.component';
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ChatComponent } from './chat/chat.component';
import { MyorderComponent } from './myorder/myorder.component';
import { ChannelComponent } from './channel/channel.component';
import { PostComponent } from './post/post.component';

import { UserprofileComponent } from './userprofile/userprofile.component';
import { PostComponent } from './post/post.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'chat', component: ChatComponent },
      {
        path: 'channel/:id1/post/:id2',
        component: PostComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'myorder',
        component: MyorderComponent,
      },
      { path: 'userprofile', component: UserprofileComponent },
      
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'channel', component: ChannelComponent },
   {
    path: 'channel/:id/post/:id',
    component: PostComponent,
 
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
