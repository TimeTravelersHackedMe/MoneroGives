import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Ng2OdometerModule } from 'ng2-odometer';

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
import { AdminRightMenuComponent } from './admin-right-menu/admin-right-menu';
import { SaveSettingsBarComponent } from './save-settings-bar/save-settings-bar';
import { EditSettingComponent } from './edit-setting/edit-setting';
import { CurrencyChartComponent } from './currency-chart/currency-chart';
import { PrettyCurrencyPipe } from '../pipes/pretty-currency/pretty-currency';

@NgModule({
	declarations: [
		SideMenuEntryComponent,
		NavBarComponent,
		PoolConfigTableComponent,
		CardChartComponent,
		PoolStatsTableComponent,
		NetworkStatsTableComponent,
		CenterComponent,
		HashOverlayComponent,
		AdminRightMenuComponent,
		SaveSettingsBarComponent,
		EditSettingComponent,
		CurrencyChartComponent
	],
	imports: [
		IonicModule,
		PipesModule,
		Ng2OdometerModule.forRoot()
	],
	exports: [
		SideMenuEntryComponent,
		NavBarComponent,
		PoolConfigTableComponent,
		CardChartComponent,
		PoolStatsTableComponent,
		NetworkStatsTableComponent,
		CenterComponent,
		HashOverlayComponent,
		AdminRightMenuComponent,
		SaveSettingsBarComponent,
		EditSettingComponent,
		CurrencyChartComponent
	],
	providers: [
		HashPipe,
		DifficultyToHashPipe,
		PrettyCurrencyPipe
	]
})
export class ComponentsModule { }
