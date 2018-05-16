import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  objSelected : any;
  fields : Array<any> = [];
  //esto deberia estar en variables de config
  numericalValues: Array<string> = ['currency','int','double','percent'];
  todo : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.objSelected = this.navParams.get('obj'); 
  	this.fields = this.navParams.get('fields');

  	console.log('objSelected ',this.objSelected);
  	console.log('fields ',this.fields);
  	
  }

  guardar(){
  	console.log('TODO : ',this.todo);
  }


}
