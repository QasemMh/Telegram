import { UserComponent } from './user/user.component';
 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ChatComponent } from './chat/chat.component';
import { MyorderComponent } from './myorder/myorder.component';

import { UserprofileComponent } from './userprofile/userprofile.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserComponent },
      { path: 'chat', component: ChatComponent },
      {
        path: 'catalog',
        component: CatalogComponent,
      },
      {
        path: 'myorder',
        component: MyorderComponent,
      },
      { path: 'userprofile', component: UserprofileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
