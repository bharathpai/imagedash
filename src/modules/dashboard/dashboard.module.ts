import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from '../dashboard/components/uploader/uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListComponent } from './components/list/list.component';
import { MaterialModule } from '../material/material.module';
import { TariffComponent } from './components/tariff/tariff.component';
import { OperatorComponent } from './components/operator/operator.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    UploaderComponent,
    ListComponent,
    TariffComponent,
    OperatorComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxFileDragDropModule
  ]
})
export class DashboardModule { }