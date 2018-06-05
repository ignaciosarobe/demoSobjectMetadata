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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';*/
var SalesforceProvider = /** @class */ (function () {
    //username = "daniel.pereira@xappia.com";
    //password = "xappia10";
    //token = "M1uV24d15OAOpvlFMo8yCbds" ;  
    function SalesforceProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.url = 'https://login.salesforce.com/services/oauth2/token';
        this.grant_type = "password";
        this.client_id = "3MVG9g9rbsTkKnAVk2cupwGP3aX9EvUlDkkZgETvAxDGx2jfaN7fjCJEjHMeXUFhqa580FkKM.9a6uICLUzoU";
        this.client_secret = "249220363635059161";
        this.username = "dani@x.com";
        this.password = "xappia123";
        this.token = "lu6EVD1VoGDguXJpKPSwzYCFb";
    }
    SalesforceProvider.prototype.login = function () {
        var parameters = '?grant_type=' + this.grant_type + "&client_id=" + this.client_id + "&client_secret=" +
            this.client_secret + "&username=" + this.username + "&password=" + this.password + this.token;
        return this.http.post(this.url + parameters, '').toPromise();
    };
    SalesforceProvider.prototype.getMetadaObjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.storage.get('LogData')];
                    case 1:
                        credentials = _a.sent();
                        return [2 /*return*/, this.http.get(credentials.instance_url + '/services/apexrest/objetos/', { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + credentials.access_token,
                                    'Content-Type': 'application/json' }) }).toPromise()];
                    case 2:
                        e_1 = _a.sent();
                        console.log('error en getObjectsCustomWS ', e_1.message);
                        throw new Error(e_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalesforceProvider.prototype.query = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var credentials, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.storage.get('LogData')];
                    case 1:
                        credentials = _a.sent();
                        console.log(credentials);
                        return [2 /*return*/, this.http.get(credentials.instance_url + '/services/data/v41.0/query/?q=' + encodeURI(query), { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + credentials.access_token,
                                    'Content-Type': 'application/json' }) }).toPromise()];
                    case 2:
                        e_2 = _a.sent();
                        console.log('error en getQueryResult ', e_2.message);
                        throw new Error(e_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SalesforceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Storage])
    ], SalesforceProvider);
    return SalesforceProvider;
}());
export { SalesforceProvider };
//# sourceMappingURL=salesforce.js.map