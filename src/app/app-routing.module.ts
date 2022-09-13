import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationGuard } from './authorization.guard';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },

  { path: 'admin', loadChildren: () => AdminModule },

  {
    path: 'user',
    loadChildren: () => UserModule,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
