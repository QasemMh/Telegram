import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import {UserprofileComponent} from './user/userprofile/userprofile.component'
import { NgxSpinnerModule } from 'ngx-spinner';

import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/Interceptor/token.Interceptor';
 import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-chartjs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
 
import { HttpClientModule } from '@angular/common/http';
 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserprofileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModule,
     ToastrModule.forRoot(),
    NgChartsModule, // ToastrModule added
     HttpClientModule
   ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
