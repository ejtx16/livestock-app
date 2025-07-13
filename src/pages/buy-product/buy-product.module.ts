import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyProductPage } from './buy-product';

@NgModule({
  declarations: [
    BuyProductPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyProductPage),
  ],
})
export class BuyProductPageModule {}
