import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqliteProvider } from '../sqlite/sqlite';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { Storage } from '@ionic/storage';


@Injectable()
export class EstructuraDbProvider {

  table : String;
  columns = [];
  SFrecords = [];

  constructor(public http: HttpClient, 
  	          public sqlite : SqliteProvider,
  	          public salesForce : SalesforceProvider,
              private storage: Storage) {
  }

  async create(metaData : any){
  
    
    for (let i in metaData.sobjects) {
      	 let obj = metaData.sobjects[i];
      	 try{
      	      console.log("obj ",obj);
      	      this.table = obj.nombre;
              let tableOk = await this.createTable(obj);
              let uniqueIndex =  this.sqlite.query(`CREATE UNIQUE INDEX IF NOT EXISTS idx_${this.table}_sfId ON ${this.table} (sfId)`);
              let query = `PRAGMA table_info( ${this.table} );`;
              let tableSchema = await this.sqlite.query(query);
              let sfRecords = await this.salesForce.query(this.SFrecordsQueryFormat(tableSchema));
              query = this.sqliteUpsertQueryFormat(sfRecords);
              let recordsValues = this.getRecordsValues();
              let saveRecordsOk = this.saveSFrecords(query,recordsValues);
   
                this.columns = [];
      	    }catch(e){
      	 	    throw `Error al crear la tabla o al traer los registros ${obj.nombre} , msg : ${e.message}`;
            }
    }
    	 
  }

  //FALTA ADJUNTAR LOS ITEMS DEL PICKLIST EN SALESFORCE

  async createTable(object : any){
 
    let sql = `CREATE TABLE IF NOT EXISTS ${object.nombre} (id INTEGER PRIMARY KEY AUTOINCREMENT,sfId TEXT,`;
    let columns = '';

  	object.fields.forEach( (field, index) => {
        let sqliteType = this.convertFieldType(field.Tipo__c);
        columns += `${field.Name} ${sqliteType} ,`;    
    });

    sql = `${sql} ${columns.slice(0,-1)} )`;
    try{
    	return await this.sqlite.query(sql);
    }catch(e){
        throw e.message;
    }

  }

  SFrecordsQueryFormat(tableSchema: any) {  
    let columnsSize = tableSchema.rows.length;

    for(let i=0; i<columnsSize; i++){
        //console.log("column ", tableSchema.rows.item(i));
        let columnName = tableSchema.rows.item(i).name;
        if(columnName != 'id' && columnName != 'sfId'){
           this.columns.push(columnName);
        }
    }
    console.log(`SELECT Id,${this.columns.join(',')} FROM ${this.table} LIMIT 10`);
    return `SELECT Id,${this.columns.join(',')} FROM ${this.table} LIMIT 10`;
  }

  sqliteUpsertQueryFormat(records : any){
 
    if(records.totalSize == 0){ return null;}

    console.log("records ", records);
    this.SFrecords = records.records;
    this.columns.unshift('sfId');
    let query = `INSERT OR REPLACE INTO ${this.table}`;
    let cols = `(${this.columns.join(',')})`;
    let values = '?,'.repeat(this.columns.length);
    values = `VALUES (${values.slice(0,-1)})`;

    return `${query} ${cols} ${values}`;
  }

  getRecordsValues(){

    let values = [];
    this.SFrecords.forEach((record,i) =>{
    	console.log(record);
        values[i] = new Array();
        for (let key in record) { values[i].push(record[key]); }
        values[i].shift();//borramos el campo type/url que retorna sf en cada registro
    }); 
    return values;
  }

  saveSFrecords(query: string, recordsValues: any){

    for (let key in recordsValues){
         try{
         	  let saveOk = this.sqlite.query(query,recordsValues[key]);
         	  console.log('saveOk index ',key,saveOk);

         }catch(e){
         	throw e.message;
         }
    } 

  }


  convertFieldType(sfType: String){
 
    switch (sfType) {
    	case "STRING":
            return "TEXT";  		
		
		case "DOUBLE":
		    return "REAL";
		
		case "PICKLIST": //verificar si sirve que sea TEXT
            return "TEXT";		
		
		case "REFERENCE":
		    return "NONE";
		
		case "TEXTAREA":
            return "TEXT";		
		
		case "URL":
		    return "TEXT";
		
		case "CURRENCY":
            return "REAL";		
		
		case "DATE":
		    return "TEXT"; 
		
		case "BOOLEAN":
	        return "NUMERIC";	
		
		case "PERCENT":
	        return "INTEGER";

	    case "PHONE":
	        return "TEXT";	

    	default:
    	  return "NONE";
    	
    }
  }

}
