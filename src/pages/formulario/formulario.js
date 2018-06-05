var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
var FormularioPage = /** @class */ (function () {
    function FormularioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fields = [];
        //esto deberia estar en variables de config
        this.numericalValues = ['currency', 'int', 'double', 'percent'];
        this.objSelected = this.navParams.get('obj');
        this.fields = this.navParams.get('fields');
        console.log('objSelected ', this.objSelected);
        console.log('fields ', this.fields);
    }
    FormularioPage.prototype.guardar = function () {
        console.log('TODO : ', this.todo);
    };
    FormularioPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-formulario',
            templateUrl: 'formulario.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], FormularioPage);
    return FormularioPage;
}());
export { FormularioPage };
//# sourceMappingURL=formulario.js.map