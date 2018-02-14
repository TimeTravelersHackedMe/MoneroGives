import { NgModule } from '@angular/core';

import { HashPipe } from './hash/hash';
import { DifficultyToHashPipe } from './difficulty-to-hash/difficulty-to-hash';
import { XmrPipe } from './xmr/xmr';
import { HashToLinkPipe } from './hash-to-link/hash-to-link';
import { ConvertCurrencyPipe } from './convert-currency/convert-currency';
import { FromNowPipe } from './from-now/from-now';

@NgModule({
    declarations: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe,
        HashToLinkPipe,
        ConvertCurrencyPipe,
    FromNowPipe
    ],
    imports: [],
    exports: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe,
        HashToLinkPipe,
        ConvertCurrencyPipe,
    FromNowPipe
    ]
})
export class PipesModule { }
