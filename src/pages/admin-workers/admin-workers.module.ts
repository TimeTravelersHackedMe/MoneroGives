import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AdminWorkersPage } from './admin-workers';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminWorkersPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminWorkersPage),
    ComponentsModule,
    PipesModule
  ],
})
export class AdminWorkersPageModule { }
