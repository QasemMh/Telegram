import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ChatComponent } from './chat/chat.component';
import { MyorderComponent } from './myorder/myorder.component';

const routes: Routes = [
  {path:'chat',
  component:ChatComponent}
  ,
  {
    path:'catalog',
  component:CatalogComponent}
  ,
  {
    path:'myorder',
  component:MyorderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
