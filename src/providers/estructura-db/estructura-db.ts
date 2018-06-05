import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqliteProvider } from '../sqlite/sqlite';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';


@Injectable()
export class EstructuraDbProvider {

  table : String;
  columns = [];
  SFrecords = [];

  constructor(public http: HttpClient, 
  	          public sqlite : SqliteProvider,
  	          public salesForce : SalesforceProvider) {
  }

  async createTables(result : any){
   
    for (let i in result.sobjects) {
    	 let obj = result.sobjects[i];
    	 try{
    	      console.log("obj ",obj);
    	      this.table = obj.nombre;
              let tableOk = await this.createTable(obj);
              let query = `PRAGMA table_info( ${obj.nombre} );`;
              let tableSchema = await this.sqlite.query(query);
              let records = await this.salesForce.query(this.SFrecordsQueryFormat(tableSchema));
              query = this.sqliteUpsertQueryFormat(records);
              let saveOk = this.saveSFrecords(query);

              this.columns = [];
    	    }catch(e){
    	 	  throw `Error al crear la tabla o al traer los registros ${obj.nombre} , msg : ${e.message}`;
            }
    }
    	 
  }

  //FALTA ADJUNTAR LOS ITEMS DEL PICKLIST EN SALESFORCE

  async createTable(object : any){
 
    let sql = `CREATE TABLE IF NOT EXISTS ${object.nombre} (id INTEGER PRIMARY KEY AUTOINCREMENT, sfId TEXT,`;
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

  	console.log('esquema : ',tableSchema); 
   
    let columnsSize = tableSchema.rows.length;

    for(let i=0; i<columnsSize; i++){
        console.log("column ", tableSchema.rows.item(i));
        let columnName = tableSchema.rows.item(i).name;
        if(columnName != 'id' && columnName != 'sfId'){
           this.columns.push(columnName);
        }
    }

    return `SELECT Id,${this.columns.join(',')} FROM ${this.table} LIMIT 10`;
  }

  sqliteUpsertQueryFormat(records : any){
 
    if(records.totalSize == 0){ return null;}

    console.log("records ", records);
    this.SFrecords = records.records;

    let query = `INSERT OR REPLACE INTO ${this.table}`;
    let cols = `(${this.columns.join(',')})`;
    let values = '?,'.repeat(this.columns.length);
    values = `VALUES (${values.slice(0,-1)})`;

    return `${query} ${cols} ${values}`;
  }

  saveSFrecords(query : string){

    let values = []; //QUE ESTA FUNCION SOLO DEVUELVA LOS VALORES
    this.SFrecords.forEach(record =>{
    	//console.log(Object.keys(record));
        for (let key in record) {
	         console.log(key);
	         if(this.columns.indexOf(key) != -1){
	         	values.push(record[key]); //TIENE QUE SER UN ARRAY DE ARRAY
	         }
	    }

    }) 

    console.log('values',values);



    /*if(query != null){
      	
      	console.log("query insert ",query);
        let insertsOk = await this.sqlite.query(query,sfvalues);
        console.log("insertsOk ",insertsOk);
     }*/

    
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
