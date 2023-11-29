import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';



@NgModule({
  declarations: [
    PurchaseComponent,
    NewPurchaseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PurchaseModule { }
