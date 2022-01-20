import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatIconModule
  ]
})
export class MaterialModule { }
