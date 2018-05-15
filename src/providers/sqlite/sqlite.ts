import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteProvider {

	constructor(public http: HttpClient) {


	}

	/*createDB(){
	    return this.sqlite.create({
		  name: 'data.db',
		  location: 'default'
	    });
	}*/

}
