import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { ProductComponent } from '../product/components/product/product.component';
import { CustomerComponent } from '../customer/components/customer/customer.component';
import { SupplierComponent } from '../supplier/components/supplier/supplier.component';
import { SaleComponent } from '../sale/components/sale/sale.component';
import { PurchaseComponent } from '../purchase/components/purchase/purchase.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: 'sale', component:  SaleComponent},
    { path: 'purchase', component:  PurchaseComponent},
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
