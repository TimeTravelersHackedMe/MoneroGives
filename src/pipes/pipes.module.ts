import { NgModule } from '@angular/core';

import { HashPipe } from './hash/hash';
import { DifficultyToHashPipe } from './difficulty-to-hash/difficulty-to-hash';
import { XmrPipe } from './xmr/xmr';
import { HashToLinkPipe } from './hash-to-link/hash-to-link';
import { ConvertCurrencyPipe } from './convert-currency/convert-currency';
import { FromNowPipe } from './from-now/from-now';
import { WherePipe } from './where/where';
import { PrettySettingsPipe } from './pretty-settings/pretty-settings';
import { MainLoopPipe } from './main-loop/main-loop';
import { PoolTypePipe } from './pool-type/pool-type';
import { WhereTruePipe } from './where-true/where-true';
import { PrettyPortTypePipe } from './pretty-port-type/pretty-port-type';
import { HasLengthPipe } from './has-length/has-length';
import { PrettyCurrencyPipe } from './pretty-currency/pretty-currency';
import { FullCurrencyNamePipe } from './full-currency-name/full-currency-name';

@NgModule({
    declarations: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe,
        HashToLinkPipe,
        ConvertCurrencyPipe,
        FromNowPipe,
        WherePipe,
    PrettySettingsPipe,
    MainLoopPipe,
    PoolTypePipe,
    WhereTruePipe,
    PrettyPortTypePipe,
    HasLengthPipe,
    PrettyCurrencyPipe,
    FullCurrencyNamePipe
    ],
    imports: [],
    exports: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe,
        HashToLinkPipe,
        ConvertCurrencyPipe,
        FromNowPipe,
        WherePipe,
    PrettySettingsPipe,
    MainLoopPipe,
    PoolTypePipe,
    WhereTruePipe,
    PrettyPortTypePipe,
    HasLengthPipe,
    PrettyCurrencyPipe,
    FullCurrencyNamePipe
    ]
})
export class PipesModule { }
