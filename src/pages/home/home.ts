import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { DescribeProvider } from '../../providers/describe/describe';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { 
  
  sObjects : any = null ;
  searchResult : Array<any>;
  viewSearch : boolean = true;
  Obj : any;
  records = [];

  constructor(public navCtrl: NavController,
  	          public utils : UtilitiesProvider,
              public salesForce : SalesforceProvider,
              public describeSqlite : DescribeProvider,
              private storage: Storage,
              public sqlite : SqliteProvider) {

    this.storage.get('metadata').then(metadata => this.sObjects = metadata.sobjects)
                                .catch(error => console.log(error))
  }

  get toogleHeader(){
    return this.viewSearch ? 'HOME : ' : this.Obj.label;
  }  
  

  getItems(ev: any) { 
    
    let val = ev.target.value;

    if (val && val.trim() != '' && this.sObjects != null) {

         this.searchResult = this.sObjects.filter((obj) => {
            
            this.utils.dismissLoading();
            return (obj.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async objectSelected(metadaObj : any){

  	this.utils.showLoading('Buscando registros...');
   
  	this.viewSearch = false;
    this.Obj = metadaObj;

    try{
        let query = `SELECT * FROM ${metadaObj.nombre}`;
        let recs = await this.sqlite.query(query);
        for (var i = 0; i < recs.rows.length; i++) {
             this.records.push(recs.rows.item(i));
        }

        this.utils.dismissLoading();

    }catch(e){

        this.utils.dismissLoading();
        this.utils.showAlert('informe',e.message);
    }

  }

  edit(record: any){
    this.goToForm(record);
  }

  delete(record: any){

  }

  
  goToForm(record: any){
    this.navCtrl.push('FormularioPage',{ obj: this.Obj, record: record });
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
