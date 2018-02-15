import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PaymentsPage } from './payments';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PaymentsPageModule {}
