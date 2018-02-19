import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AdminPortsPage } from './admin-ports';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminPortsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPortsPage),
    ComponentsModule,
    PipesModule
  ],
})
export class AdminPortsPageModule { }
