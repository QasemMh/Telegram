import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },

  {path:'admin',
  loadChildren:()=>AdminModule
},

{path:'user',
loadChildren:()=>UserModule
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
