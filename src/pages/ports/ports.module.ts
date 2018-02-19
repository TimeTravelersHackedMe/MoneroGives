import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PortsPage } from './ports';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PortsPage,
  ],
  imports: [
    IonicPageModule.forChild(PortsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PortsPageModule {}
