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

  createTable(sql: string) {
    //let sql = "create table if not exists describe(nombreObj TEXT PRIMARY KEY , campos TEXT)";
    this.db.executeSql(sql, []).then(()=>{
       console.log("tabla creada con exito");
    }).catch(error => console.log(error));

  }

  upsert(objName : string, fields : string){
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
  } 

}
