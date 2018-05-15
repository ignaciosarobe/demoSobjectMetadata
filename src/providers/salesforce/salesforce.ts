import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class SalesforceProvider {

  url = 'https://login.salesforce.com/services/oauth2/token';
  grant_type = "password";
  client_id = "3MVG9g9rbsTkKnAVk2cupwGP3aX9EvUlDkkZgETvAxDGx2jfaN7fjCJEjHMeXUFhqa580FkKM.9a6uICLUzoU";
  client_secret = "249220363635059161";

  //username = "dani@x.com";
  //password = "xappia123";
  //token = "lu6EVD1VoGDguXJpKPSwzYCFb" ;  

  username = "daniel.pereira@xappia.com";
  password = "xappia10";
  token = "M1uV24d15OAOpvlFMo8yCbds" ;  

  constructor(public http: HttpClient, private storage: Storage) {  }

  login(){
   
    let parameters = '?grant_type=' + this.grant_type + "&client_id=" + this.client_id + "&client_secret=" +
                      this.client_secret + "&username=" + this.username + "&password=" + this.password+this.token;

    return this.http.post(this.url + parameters,'').toPromise();

  }

  getQueryResult(query : string){ 

  	this.storage.get('LogData').then((info) => {
        
       	return this.http.get(info.instance_url+'/services/data/v41.0/query/?q='+ encodeURI(query),
    	         {headers: new HttpHeaders({'Authorization': 'Bearer '+info.token ,
    	                                    'Content-Type': 'application/json'})})
	       	   .toPromise()
		       .then(data => {
		       	 console.log("get all result : ", data)
		       })
		       .catch(Error =>{
		       	 console.log("Error : ", Error)
		       });
    })
   
  }

  handleError(error : Response){
    let msg = 'Error en consulta : ${error.status} en ${error.url}';
    return  Observable.throw(msg);
  }

  getOneObject(objName: string, id: string){
  	this.storage.get('LogData').then((info) => {

        let token = info.access_token;
	    this.http.get(info.instance_url+'/services/data/v41.0/sobjects/'+objName+'/'+id,
	    	         {headers: new HttpHeaders({'Authorization': 'Bearer '+token ,
	    	                                    'Content-Type': 'application/json'})})
		   .toPromise()
	       .then(data => {
	       	 console.log("get one result : ", data)
	       })
	       .catch(Error =>{
	       	 console.log("Error : ", Error)
	       });
    });
  }

  insertObject(objName : string, data: any){

  	this.storage.get('LogData').then((info) => {

        let token = info.access_token;
	    this.http.post(info.instance_url+'/services/data/v41.0/sobjects/'+objName+'/',data,
	    	           {headers: new HttpHeaders({'Authorization': 'Bearer '+token ,
	    	                                      'Content-Type': 'application/json'})})
		   .toPromise()
	       .then(data => {
	       	 console.log("post result : ", data)
	       })
	       .catch(Error =>{
	       	 console.log("Error : ", Error)
	       });
        });
  }

  updateObject(objName: string, id: string, data: any){

  	this.storage.get('LogData').then((info) => {

        let token = info.access_token;
	    this.http.patch(info.instance_url+'/services/data/v41.0/sobjects/'+objName+'/'+id, data,
	    	           {headers: new HttpHeaders({'Authorization': 'Bearer '+token ,
	    	                                      'Content-Type': 'application/json'})})
		   .toPromise()
	       .then(data => {
	       	 console.log("update result : ", data)
	       })
	       .catch(Error =>{
	       	 console.log("Error : ", Error)
	       });
        });
  }

  deleteObject(objName: string, id: string){

  	this.storage.get('LogData').then((info) => {

        let token = info.access_token;
	    this.http.delete(info.instance_url+'/services/data/v41.0/sobjects/'+objName+'/'+id,
	    	           {headers: new HttpHeaders({'Authorization': 'Bearer '+token ,
	    	                                      'Content-Type': 'application/json'})})
		   .toPromise()
	       .then(data => {
	       	 console.log("delete result : ", data)
	       })
	       .catch(Error =>{
	       	 console.log("Error : ", Error)
	       });
        });
  }
}
