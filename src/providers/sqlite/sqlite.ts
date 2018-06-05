import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Injectable()
export class SqliteProvider {

  db: SQLiteObject = null;
  
  constructor(public http: HttpClient, private storage: Storage) {}

  setDatabase(db: SQLiteObject){

    if(this.db === null){
       this.db = db;
    }
  }

  query(sql: string , params?: any) {
    
    if(params != null){ return this.db.executeSql(sql, params); }
    
    return this.db.executeSql(sql,[]);
  }

 
  /*upsert(objName : string, fields: any ){
    let sql = "INSERT OR REPLACE INTO describe(nombreObj, campos) VALUES (?, ?)";
    let values = [objName, fields];
    return this.db.executeSql(sql,values);
  }

  get(objName ?:string){
    let sql = (objName) ? "Select * FROM describe where nombreObj = (?) " : "Select * FROM describe";
    let values = (objName) ? [objName] : [] ;
    return this.db.executeSql(sql,values);
  }

  drop(tableName : string){
  	let sql ="delete from "+tableName;
    return this.db.executeSql(sql,[]);
  } */

}
