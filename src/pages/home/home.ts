import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { DescribeProvider } from '../../providers/describe/describe';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  
  metaObjects : any = null ;
  errorMsg : string;
  searchResult : Array<any>;
  viewSearch : boolean = true;
  fields : Array<any> = [];
  Obj : any;

  constructor(public navCtrl: NavController,
  	          public utils : UtilitiesProvider,
              public salesForce : SalesforceProvider,
              public describeSqlite : DescribeProvider
              ) {
  }

  get toogleHeader(){
    return this.viewSearch ? 'Elegir Objeto : ' : this.Obj.label;
  }  
  

  getItems(ev: any) {
    
    //thi
    //aca le pegaria a sqlite

    let val = ev.target.value;

    if (val && val.trim() != '' && this.metaObjects != null) {

         this.searchResult = this.metaObjects.filter((obj) => {

            this.utils.dismissLoading();
            return (obj.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async objectSelected(obj : any){

  	this.utils.showLoading('Actualizando campos...');
  	this.viewSearch = false;
    this.Obj = obj;

    try{

        //let object = await this.salesForce.getMetadaObject(obj.name);
        //console.log('campos sin filtar : ',object['fields']);


        //this.fields = this.fieldsFilter(object);
        
        //await this.describeSqlite.upsert(obj.name, JSON.stringify(this.fields));
      
        this.utils.dismissLoading();

    }catch(e){

        this.utils.dismissLoading();
        this.utils.showAlert('informe',e.message);
    }

  }

  async goToForm(){

    //test
     let describes =  await this.describeSqlite.get();
     for (var i = 0; i < describes.rows.length; i++) {
         console.log('describe :  ', describes.rows.item(i));
     }
    //test


     this.utils.showLoading(null,true);// ponerlo en true a veces tira un error
     this.navCtrl.push('FormularioPage',{ obj: this.Obj, fields: this.fields });
  }


  





  /*
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
  }*/

}
