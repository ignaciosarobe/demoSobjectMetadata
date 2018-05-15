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
  
  metaObjects = null ;
  errorMsg :  string;
  mostrar : boolean = false;
  searchResult = [];
  viewSearch = true;
  fields = [];
  nameObj : string = 'Elegir Objecto';

  constructor(public navCtrl: NavController,
  	          public utils : UtilitiesProvider,
              public salesForce : SalesforceProvider,
              public describeSqlite : DescribeProvider
              ) {

    this.getObjectDescribe();
  } 



  getItems(ev: any) {
    
    this.getObjectDescribe();

    let val = ev.target.value;

    if (val && val.trim() != '' && this.metaObjects != null) {

         this.searchResult = this.metaObjects.filter((obj) => {

            this.utils.dismissLoading();
            return (obj.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getObjectDescribe(){

    this.salesForce.getAllMetadaObjects().subscribe( 

        accs => {
        	this.metaObjects = accs['sobjects'].filter( obj => obj.updateable && obj.layoutable );
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

  	this.utils.showLoading('Actualizando campos...');
  	this.viewSearch = false;
    this.nameObj = this.viewSearch ? this.nameObj : obj.label;

    try{
  
        let object = await this.salesForce.getMetadaObject(obj.name);
        console.log("object : ", object);

        this.fields = this.filtrarCampos(object);
        
        console.log("campos : ", this.fields);

        await this.describeSqlite.drop('describe');
       
        let result = await this.describeSqlite.upsert(obj.name,JSON.stringify(this.fields));
        console.log("result insert: ", result);

        let describes = await this.describeSqlite.get();

       for (let index = 0; index < describes.rows.length; index++) { 
            console.log( describes.rows.item(index) );
            console.log( JSON.parse(describes.rows.item(index).campos) ); //queda colgado el nombre del obj 
       }

        this.utils.dismissLoading();

    }catch(e){

        this.utils.dismissLoading();
        this.utils.showAlert('informe',e.message);
    }

  }

  filtrarCampos(object : any){

    let lista = [];

    object['fields'].forEach(obj =>{
       if(obj.updateable)
          lista.push({ label :obj.label ,tipo: obj.type, picklist: this.filtrarPickList(obj.picklistValues)});
    })
    return lista;
  }

  filtrarPickList(picklistValues : any){
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
