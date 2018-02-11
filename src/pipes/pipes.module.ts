import { NgModule } from '@angular/core';

import { HashPipe } from './hash/hash';
import { DifficultyToHashPipe } from './difficulty-to-hash/difficulty-to-hash';
import { XmrPipe } from './xmr/xmr';

@NgModule({
    declarations: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe
    ],
    imports: [],
    exports: [
        HashPipe,
        DifficultyToHashPipe,
        XmrPipe
    ]
})
export class PipesModule { }
