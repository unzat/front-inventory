import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './components/sale/sale.component';
import { NewSaleComponent } from './components/new-sale/new-sale.component';



@NgModule({
  declarations: [
    SaleComponent,
    NewSaleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SaleModule { }
