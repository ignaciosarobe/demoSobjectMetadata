import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { DescribeObjectsProvider } from '../../providers/describe-objects/describe-objects';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  
  metaObjects = null ;
  errorMsg :  string;
  mostrar : boolean = false;
  searchResult = [];
  viewSearch = true;
  fields = [];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, 
  	          public salesForce : SalesforceProvider,
  	          public sfDescribe : DescribeObjectsProvider,
  	          public utils : UtilitiesProvider,
  	          private storage: Storage) {

  
  } 

  async login(){
    
    this.utils.showLoading();

  	try{
	  	  const logData = await this.salesForce.login();
	  	  console.log("datos : ", logData)
	      this.storage.set('LogData',logData);
	      this.getObjectDescribe();

  	}catch(e){
          this.utils.dismissLoading();
          this.utils.showAlert('informe',e.message);
  	}
	
  }

  getItems(ev: any) {
    
    this.getObjectDescribe();

    let val = ev.target.value;

    if (val && val.trim() != '') {
         this.searchResult = this.metaObjects.filter((obj) => {

            this.utils.dismissLoading();
            return (obj.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getObjectDescribe(){

    this.sfDescribe.getAllObjects().subscribe( 

        accs => {
        	this.metaObjects = accs['sobjects'].filter( obj => obj.updateable);
        	console.log('objetos editables ',this.metaObjects)
        	this.utils.dismissLoading();
        },
  	   	error => {
  	   		 this.utils.dismissLoading();
  	   		 this.errorMsg = <any>error;
  	   		 this.utils.showAlert('Error',this.errorMsg);
  	   	}	 
    )
  }

  async objectSelected(obj : any){

  	this.utils.showLoading('Configurando el objeto...');
  	this.viewSearch = false;
    console.log('obj seleccionado : ',obj.name);

    try{
  
        let object = await this.sfDescribe.getMetadaObject(obj.name);

        this.fields = object['fields'].filter(obj => obj.updateable);

        this.fields.map( field => console.log('campos : ', field, field.length) )

        //aca haria el llamado para la creacion de las tablas
        

        this.utils.dismissLoading();

    }catch(e){

        this.utils.dismissLoading();
        this.utils.showAlert('informe',e.message);
    }

  }



  //**********************************************************************************

  getAllAccount(){
  	this.salesForce.getQueryResult("SELECT Name,Phone,Email FROM Account ORDER BY Name ASC");
  }

  insertAccount(){
  	this.salesForce.insertObject("Account",{Name:'Prueba desde ionic',Description:'esto es un test'});
  }

  updateAccount(){
  	this.salesForce.updateObject("Account",'0011I00000PpPY7QAN',{Description:'IONIC UPDATE FUNCIONANDO',Phone:'0800 pussy'});
  }

  deleteAccount(){ 
    this.salesForce.deleteObject("Account","0011I00000EoMktQAF");
  }

  getAccount(){
  	this.salesForce.getOneObject("Account","0011I000002n3KAQAY");
  }

  //*********************************************************************************



}
