import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public utils : UtilitiesProvider,
  	          public salesForce : SalesforceProvider,
  	          private storage: Storage) {
  }

  async login(){
    
    this.utils.showLoading('Aguarde unos instantes ...',true);

  	try{
	  	  const logData = await this.salesForce.login();
	      this.storage.set('LogData',logData);
	      this.navCtrl.push('HomePage');

  	}catch(e){
          this.utils.dismissLoading();
          this.utils.showAlert('informe',e.message);
  	}
	
  }

}
