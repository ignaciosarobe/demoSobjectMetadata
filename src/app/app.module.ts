import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import { HttpHeaders } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { SalesforceProvider } from '../providers/salesforce/salesforce';
import { UtilitiesProvider } from '../providers/utilities/utilities';
import { DescribeProvider } from '../providers/describe/describe';
import { EstructuraDbProvider } from '../providers/estructura-db/estructura-db';
import { SqliteProvider } from '../providers/sqlite/sqlite';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    
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
    LoginPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    SalesforceProvider,
    UtilitiesProvider,
    DescribeProvider,
    EstructuraDbProvider,
    EstructuraDbProvider,
    SqliteProvider,
    SqliteProvider
  ]
})
export class AppModule {}
