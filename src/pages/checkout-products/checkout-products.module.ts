import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutProductsPage } from './checkout-products';

@NgModule({
  declarations: [
    CheckoutProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutProductsPage),
  ],
})
export class CheckoutProductsPageModule {}
