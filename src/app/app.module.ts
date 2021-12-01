import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
