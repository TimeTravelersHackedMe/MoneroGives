import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PaymentsPage } from './payments';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsPage),
    ComponentsModule
  ],
})
export class PaymentsPageModule {}
