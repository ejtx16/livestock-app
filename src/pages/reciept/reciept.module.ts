import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecieptPage } from './reciept';

@NgModule({
  declarations: [
    RecieptPage,
  ],
  imports: [
    IonicPageModule.forChild(RecieptPage),
  ],
})
export class RecieptPageModule {}
