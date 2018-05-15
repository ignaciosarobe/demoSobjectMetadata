import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { SQLite } from "@ionic-native/sqlite";
import { DescribeProvider } from '../providers/describe/describe';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public sqlite: SQLite,
              public describeSqlite : DescribeProvider) {

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

      this.describeSqlite.setDatabase(db);
      this.describeSqlite.createTable();
   
    }).catch(error =>{
      console.error(error);
    });
  }

}