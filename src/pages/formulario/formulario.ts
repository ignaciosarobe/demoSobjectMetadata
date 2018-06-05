import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqliteProvider } from '../../providers/sqlite/sqlite';


@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  objName : string;
  record : Array<any> = [];
  //esto deberia estar en variables de config
  numericalValues: Array<string> = ['currency','int','double','percent'];
  //todo : any;
  tableSchema : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public sqlite : SqliteProvider) {

  	this.objName = this.navParams.get('objName'); 
  	this.record = this.navParams.get('record');
    this.getTableSchema();
    
    console.log('table ',this.objName);
    console.log('record ',this.record);

    
                                             
  }

  async getTableSchema(){
    this.tableSchema = await this.sqlite.getTableSchema(this.objName);
    console.log('tableSchema ',this.tableSchema);
  }



  guardar(){
  	//console.log('TODO : ',this.todo);
  }


}
