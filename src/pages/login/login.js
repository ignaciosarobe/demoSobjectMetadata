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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
import { Storage } from '@ionic/storage';
import { EstructuraDbProvider } from '../../providers/estructura-db/estructura-db';
import { SqliteProvider } from '../../providers/sqlite/sqlite';
var LoginPage = /** @class */ (function () {
    //metaObjects : any;
    //errorMsg : string;
    function LoginPage(navCtrl, navParams, utils, salesForce, storage, sqlite, localStructure) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utils = utils;
        this.salesForce = salesForce;
        this.storage = storage;
        this.sqlite = sqlite;
        this.localStructure = localStructure;
    }
    LoginPage.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, objs, tablesOk, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.utils.showLoading('Aguarde unos instantes ...', true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.salesForce.login()];
                    case 2:
                        log = _a.sent();
                        this.storage.set('LogData', log);
                        return [4 /*yield*/, this.salesForce.getMetadaObjects()];
                    case 3:
                        objs = _a.sent();
                        return [4 /*yield*/, this.localStructure.createTables(objs)];
                    case 4:
                        tablesOk = _a.sent();
                        //let insertsOk = await this.localDB.setRecordsByObject(recordsOk);
                        this.utils.dismissLoading();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.utils.dismissLoading();
                        this.utils.showAlert('informe', e_1.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.drop = function () {
        this.sqlite.query('DROP TABLE IF EXISTS Account;');
    };
    LoginPage.prototype.showTable = function () {
        this.sqlite.query('PRAGMA table_info(Account);')
            .then(function (success) {
            console.log("success schema: ", success);
            for (var i = 0; i < success.rows.length; i++) {
                console.log("row ", success.rows.item(i));
            }
        }).catch(function (error) {
            console.log("error schema : ", error);
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            UtilitiesProvider,
            SalesforceProvider,
            Storage,
            SqliteProvider,
            EstructuraDbProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map