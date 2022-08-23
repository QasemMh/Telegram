import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ManageHomeComponent,
    FooterComponent,
    HeaderComponent,
    RolesComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
