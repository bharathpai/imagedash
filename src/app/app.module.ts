import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
