import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { SideMenuEntryComponent } from './side-menu-entry/side-menu-entry';
import { NavBarComponent } from './nav-bar/nav-bar';
import { PoolConfigTableComponent } from './pool-config-table/pool-config-table';
import { PipesModule } from '../pipes/pipes.module';
import { CardChartComponent } from './card-chart/card-chart';
import { HashPipe } from '../pipes/hash/hash';
import { DifficultyToHashPipe } from '../pipes/difficulty-to-hash/difficulty-to-hash';
import { PoolStatsTableComponent } from './pool-stats-table/pool-stats-table';
import { NetworkStatsTableComponent } from './network-stats-table/network-stats-table';
import { CenterComponent } from './center/center';
import { HashOverlayComponent } from './hash-overlay/hash-overlay';

@NgModule({
	declarations: [
		SideMenuEntryComponent,
		NavBarComponent,
		PoolConfigTableComponent,
		CardChartComponent,
		PoolStatsTableComponent,
		NetworkStatsTableComponent,
<<<<<<< HEAD
		CenterComponent,
		HashOverlayComponent
=======
		CenterComponent
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0
	],
	imports: [
		IonicModule,
		PipesModule
	],
	exports: [
		SideMenuEntryComponent,
		NavBarComponent,
		PoolConfigTableComponent,
		CardChartComponent,
		PoolStatsTableComponent,
		NetworkStatsTableComponent,
<<<<<<< HEAD
		CenterComponent,
		HashOverlayComponent
=======
		CenterComponent
>>>>>>> 6897340ed44d5f3982e9eaf331752d11a610adc0
	],
	providers: [
		HashPipe,
		DifficultyToHashPipe
	]
})
export class ComponentsModule { }
