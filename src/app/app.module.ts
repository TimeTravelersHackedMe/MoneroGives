import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { Chart } from 'chart.js';
import * as moment from 'moment';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { MinerProvider } from '../providers/miner/miner';

const firebaseConfig = {
  apiKey: "AIzaSyBhagFMEWAIdudPfyC6CIdDBlLhFWGVmr8",
  authDomain: "monero-gives.firebaseapp.com",
  databaseURL: "https://monero-gives.firebaseio.com",
  projectId: "monero-gives",
  storageBucket: "monero-gives.appspot.com",
  messagingSenderId: '585062653149'
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      pageTransition: 'md-transition'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AngularFirestore,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MinerProvider
  ]
})
export class AppModule {
  constructor() {
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24 * 26);
    Chart.defaults.global.defaultFontColor = 'red';
    Chart.defaults.global.defaultFontFamily = 'Montserrat';
  }
}
