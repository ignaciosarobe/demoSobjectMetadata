import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { Storage } from '@ionic/storage';
import { DescribeProvider } from '../../providers/describe/describe';
import { EstructuraDbProvider } from '../../providers/estructura-db/estructura-db';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //metaObjects : any;
  //errorMsg : string;

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public utils : UtilitiesProvider,
  	          public salesForce : SalesforceProvider,
  	          private storage: Storage,
              public describeSqlite : DescribeProvider,
              public localDB : EstructuraDbProvider) {
  }

  async login(){ //DESPUES DE ARMAR LA STRUCT LISTAR LAS CUENTAS Y SI SE PUEDE MODIFICAR
    
    this.utils.showLoading('Aguarde unos instantes ...',true);

  	try{
      
	  	  const log = await this.salesForce.login();

        let objs = await this.salesForce.getObjectsCustomWS();
     
        let result = await this.localDB.syncObjects(objs);
        console.log('result create table ',result);
      
        this.utils.dismissLoading();
	      

  	}catch(e){

        this.utils.dismissLoading();
        this.utils.showAlert('informe',e.message);
  	}
	
  }

  /*async syncObjects(){

    try{
       
        const objects = await this.salesForce.getAllObjects();
        console.log('objetos ', objects);

        let editableObjects = objects['sobjects'].filter( obj => obj.updateable && obj.layoutable );
        console.log('objetos editables ', editableObjects);

        this.getMetadaFields(editableObjects);
        
    }catch(e){

        console.log('error en syncObjects',e.message);
        throw new Error(e.message);
    }

    
  }

  async getMetadaFields(editableObjects : any){

    for (let obj of editableObjects) {
         try{
              let fields = await this.salesForce.getFieldsObject( obj.name );
              let editableFields = this.fieldsFilter(fields);

              let result = this.describeSqlite.upsert(obj.name, JSON.stringify(editableFields));

              console.log('results upsert : '+obj.name , result);
         }catch(e){

              console.log('error en getMetadaFields ',e.message);
              throw new Error(e.message);
         }
    }
    
  }

  fieldsFilter(object : any){

    let lista = [];

    object['fields'].forEach(obj =>{
       if(obj.updateable)
          lista.push({
            required : !obj.nillable, 
            label :obj.label,
            tipo: obj.type, 
            picklist: this.pickListFilter(obj.picklistValues)});
    })
    return lista;
  }

  pickListFilter(picklistValues : any){
    if(picklistValues.length > 0){

       let listPick = [];
       picklistValues.forEach((p,i) => {
          if(p.active){
             listPick[i] = {label: p.label, value: p.value}
          }
       })
       return listPick;

    }else{ 
      return []; 
    }
  }*/

}
