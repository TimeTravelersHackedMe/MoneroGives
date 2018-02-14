import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BlocksPage } from './blocks';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BlocksPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(BlocksPage)
  ],
})
export class BlocksPageModule {}
