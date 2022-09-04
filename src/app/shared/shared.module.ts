import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';

import { NgChartsModule } from 'ng2-charts';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbButtonModule,
  NbChatModule,
  NbIconModule,
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbSearchModule,
  NbTabsetModule,
} from '@nebular/theme';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule,
    NgChartsModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbMenuModule.forRoot(), // <---------
    NbButtonModule,
    NbChatModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbSearchModule,
    NbTabsetModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbMenuModule, // <---------
    NbButtonModule,
    NbChatModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbSearchModule,
    NbTabsetModule,
  ],
})
export class SharedModule {}
