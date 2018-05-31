import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { SQLite } from "@ionic-native/sqlite";
import { SqliteProvider } from '../providers/sqlite/sqlite';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sqlite: SQLite,
              public sqliteProvider : SqliteProvider) {

    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      this.createDatabase();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    });
  }

  private createDatabase(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then((db) => {

      this.sqliteProvider.setDatabase(db);
      //this.describeSqlite.createTable();
   
    }).catch(error =>{
      console.error(error);
    });
  }

}