import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
import { SalesforceProvider } from '../providers/salesforce/salesforce';

import { IonicStorageModule } from '@ionic/storage';
import { DescribeObjectsProvider } from '../providers/describe-objects/describe-objects';
import { SqliteProvider } from '../providers/sqlite/sqlite';
import { UtilitiesProvider } from '../providers/utilities/utilities';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    //HttpHeaders,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SalesforceProvider,
    DescribeObjectsProvider,
    SqliteProvider,
    UtilitiesProvider,
    UtilitiesProvider
  ]
})
export class AppModule {}
