import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AdminPage } from './admin';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPage),
    ComponentsModule,
    PipesModule
  ],
})
export class AdminPageModule { }
