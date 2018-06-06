import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  metadataObj : string;
  record : Array<any> = [];
  //esto deberia estar en variables de config
  numericalValues: Array<string> = ['currency','int','double','percent'];
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlite : SqliteProvider,
              private storage: Storage) {

  	this.metadataObj = this.navParams.get('obj'); 
  	this.record = this.navParams.get('record');
  
    console.log('metadataObj ',this.metadataObj);
    console.log('record ',this.record);                    
  }

 



  guardar(){
  	//console.log('TODO : ',this.todo);
  }


}
