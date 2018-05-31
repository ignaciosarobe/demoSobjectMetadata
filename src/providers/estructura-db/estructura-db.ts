import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqliteProvider } from '../sqlite/sqlite';


@Injectable()
export class EstructuraDbProvider {

  tableName : String;
  columnName : Array<any>;

  constructor(public http: HttpClient, public sqliteProvider : SqliteProvider) {
    
  }

  syncObjects(result : any){
    console.log('objs ',result);
     
    result.sobjects.forEach( object => {

        console.log("OBJETO : ", object);
   
        this.createTable(object); 
    });

     

  }
  //FALTA ADJUNTAR LOS ITEMS DEL PICKLIST EN SALESFORCE
  createTable(object : any){
 
    let sql = `CREATE TABLE IF NOT EXISTS ${object.nombre} `;
    let columns = '';

  	object.fields.forEach( (field, index) => {
        //console.log("TIPO DE CAMPO SF API : ", field.Tipo__c);
        //console.log("sqliteType ", sqliteType);
        let sqliteType = this.convertFieldType(field.Tipo__c);
        columns += `( ${field.Name} ${object.sqliteType} ,`;

         if(field.length-1 == index){
            columns.slice(0,-1);  
            columns + ')';
         } 
             
    });
    
    sql = sql + columns;
    console.log("QUERY : ",sql);
    //DESDE ACA LLAMO A EL SQLITE PROVODER
  }

  convertFieldType(sfType: String){
  	//APEX NUMERIC : CURRENCY,DOUBLE, INTEGER,BOOLEAN
  	//SQLITE NUMERIC: INTEGER, TEXT , NUMERIC(PARA BOOLEANOS) REAL(DOUBLE,FLOAT),NONE
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
