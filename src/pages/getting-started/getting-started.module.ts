import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { GettingStartedPage } from './getting-started';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GettingStartedPage,
  ],
  imports: [
    IonicPageModule.forChild(GettingStartedPage),
    ComponentsModule
  ],
})
export class GettingStartedPageModule {}
