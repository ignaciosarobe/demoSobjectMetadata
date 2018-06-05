var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';
var UtilitiesProvider = /** @class */ (function () {
    function UtilitiesProvider(toastCtrl, alertCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    UtilitiesProvider.prototype.showAlert = function (title, msj) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msj,
            buttons: ['Cancelar']
        });
        alert.present();
    };
    UtilitiesProvider.prototype.showToast = function (msg, dismissFunction) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: './toast.scss'
        });
        toast.onDidDismiss((dismissFunction) ? dismissFunction() : "");
        toast.present();
    };
    UtilitiesProvider.prototype.showLoading = function (msg, dismissOnPageChange) {
        this.loading = this.loadingCtrl.create({
            content: (msg != null) ? msg : 'Por favor espere...',
            dismissOnPageChange: (dismissOnPageChange != null) ? dismissOnPageChange : false
        });
        this.loading.present();
    };
    UtilitiesProvider.prototype.dismissLoading = function () {
        this.loading.dismiss();
    };
    UtilitiesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ToastController,
            AlertController,
            LoadingController])
    ], UtilitiesProvider);
    return UtilitiesProvider;
}());
export { UtilitiesProvider };
//# sourceMappingURL=utilities.js.map