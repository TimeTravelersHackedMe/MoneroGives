import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { MinerProvider } from '../providers/miner/miner';
import { AuthProvider } from '../providers/auth/auth';
import { AdminDataProvider } from '../providers/admin-data/admin-data';
import { EditSettingComponent } from '../components/edit-setting/edit-setting';
import { HttpErrorInterceptor } from '../providers/http-interceptor/http-interceptor';
import { DataProvider } from '../providers/data/data';

/// please don't mess with this database.. you can use it for sample data if you want to run a test app
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
    AngularFirestoreModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditSettingComponent
  ],
  providers: [
    AngularFirestore,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MinerProvider,
    AuthProvider,
    AdminDataProvider,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi:true},
    DataProvider
  ]
})
export class AppModule {
  constructor() {
    moment.relativeTimeThreshold('m', 60);
    moment.relativeTimeThreshold('h', 24 * 3);
    Chart.defaults.global.defaultFontColor = 'red';
    Chart.defaults.global.defaultFontFamily = 'Montserrat';
  }
}
