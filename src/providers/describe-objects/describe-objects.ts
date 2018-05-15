import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';

@Injectable()
export class DescribeObjectsProvider {

  responseObser : Observable<Object>;

  constructor(public http: HttpClient, private storage: Storage) {}

  getAllObjects() : Observable<Object>{

     return Observable.fromPromise(this.storage.get('LogData')).concatMap(token => {

        	return this.http.get(token.instance_url+'/services/data/v20.0/sobjects/',
	    	         {headers: new HttpHeaders({'Authorization': 'Bearer '+token.access_token ,
	    	                                    'Content-Type': 'application/json'})})
	                 .do(objects => console.log("DO ",objects))
	                 .catch(this.handleError)
     });
  }

  async getMetadaObject(objName: string){

    try{
         const logData = await this.storage.get('LogData');
         return this.http.get(logData.instance_url+'/services/data/v20.0/sobjects/'+objName+'/describe/',
                 {headers: new HttpHeaders({'Authorization': 'Bearer '+logData.access_token ,
                                            'Content-Type': 'application/json'})}).toPromise();
    }
    catch(e){
        console.log(e.message);
    }
     
  }
    
  handleError(error : Response){
  	console.log(error);
    let msg = 'Error en consulta :'+ error.status +' en '+ error.url;
    return  Observable.throw(msg);
  }
}
