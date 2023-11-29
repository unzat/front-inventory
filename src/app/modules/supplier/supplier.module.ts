import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './components/supplier/supplier.component';
import { NewSupplierComponent } from './components/new-supplier/new-supplier.component';



@NgModule({
  declarations: [
    SupplierComponent,
    NewSupplierComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupplierModule { }
