var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { DescribeProvider } from '../../providers/describe/describe';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, utils, salesForce, describeSqlite) {
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.salesForce = salesForce;
        this.describeSqlite = describeSqlite;
        this.metaObjects = null;
        this.viewSearch = true;
        this.fields = [];
    }
    Object.defineProperty(HomePage.prototype, "toogleHeader", {
        get: function () {
            return this.viewSearch ? 'Elegir Objeto : ' : this.Obj.label;
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.getItems = function (ev) {
        //thi
        //aca le pegaria a sqlite
        var _this = this;
        var val = ev.target.value;
        if (val && val.trim() != '' && this.metaObjects != null) {
            this.searchResult = this.metaObjects.filter(function (obj) {
                _this.utils.dismissLoading();
                return (obj.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage.prototype.objectSelected = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.utils.showLoading('Actualizando campos...');
                this.viewSearch = false;
                this.Obj = obj;
                try {
                    //let object = await this.salesForce.getMetadaObject(obj.name);
                    //console.log('campos sin filtar : ',object['fields']);
                    //this.fields = this.fieldsFilter(object);
                    //await this.describeSqlite.upsert(obj.name, JSON.stringify(this.fields));
                    this.utils.dismissLoading();
                }
                catch (e) {
                    this.utils.dismissLoading();
                    this.utils.showAlert('informe', e.message);
                }
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.goToForm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var describes, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.describeSqlite.get()];
                    case 1:
                        describes = _a.sent();
                        for (i = 0; i < describes.rows.length; i++) {
                            console.log('describe :  ', describes.rows.item(i));
                        }
                        //test
                        this.utils.showLoading(null, true); // ponerlo en true a veces tira un error
                        this.navCtrl.push('FormularioPage', { obj: this.Obj, fields: this.fields });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            UtilitiesProvider,
            SalesforceProvider,
            DescribeProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map