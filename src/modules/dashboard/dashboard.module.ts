import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from '../dashboard/components/uploader/uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    UploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }