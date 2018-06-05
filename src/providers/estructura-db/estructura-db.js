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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SqliteProvider } from '../sqlite/sqlite';
import { SalesforceProvider } from '../../providers/salesforce/salesforce';
var EstructuraDbProvider = /** @class */ (function () {
    function EstructuraDbProvider(http, sqlite, salesForce) {
        this.http = http;
        this.sqlite = sqlite;
        this.salesForce = salesForce;
        this.columns = [];
        this.SFrecords = [];
    }
    EstructuraDbProvider.prototype.createTables = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, i, obj, tableOk, query, tableSchema, records, recordsValues, saveRecordsOk, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in result.sobjects)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        i = _a[_i];
                        obj = result.sobjects[i];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 6, , 7]);
                        console.log("obj ", obj);
                        this.table = obj.nombre;
                        return [4 /*yield*/, this.createTable(obj)];
                    case 3:
                        tableOk = _c.sent();
                        query = "PRAGMA table_info( " + obj.nombre + " );";
                        return [4 /*yield*/, this.sqlite.query(query)];
                    case 4:
                        tableSchema = _c.sent();
                        return [4 /*yield*/, this.salesForce.query(this.SFrecordsQueryFormat(tableSchema))];
                    case 5:
                        records = _c.sent();
                        query = this.sqliteUpsertQueryFormat(records);
                        console.log('query insert : ', query);
                        recordsValues = this.getRecordsValues();
                        saveRecordsOk = this.saveSFrecords(query, recordsValues);
                        this.columns = [];
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _c.sent();
                        throw "Error al crear la tabla o al traer los registros " + obj.nombre + " , msg : " + e_1.message;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //FALTA ADJUNTAR LOS ITEMS DEL PICKLIST EN SALESFORCE
    EstructuraDbProvider.prototype.createTable = function (object) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, columns, e_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "CREATE TABLE IF NOT EXISTS " + object.nombre + " (id INTEGER PRIMARY KEY AUTOINCREMENT, sfId TEXT,";
                        columns = '';
                        object.fields.forEach(function (field, index) {
                            var sqliteType = _this.convertFieldType(field.Tipo__c);
                            columns += field.Name + " " + sqliteType + " ,";
                        });
                        sql = sql + " " + columns.slice(0, -1) + " )";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sqlite.query(sql)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        throw e_2.message;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EstructuraDbProvider.prototype.SFrecordsQueryFormat = function (tableSchema) {
        console.log('esquema : ', tableSchema);
        var columnsSize = tableSchema.rows.length;
        for (var i = 0; i < columnsSize; i++) {
            //console.log("column ", tableSchema.rows.item(i));
            var columnName = tableSchema.rows.item(i).name;
            if (columnName != 'id' && columnName != 'sfId') {
                this.columns.push(columnName);
            }
        }
        console.log("SELECT Id," + this.columns.join(',') + " FROM " + this.table + " LIMIT 10");
        return "SELECT Id," + this.columns.join(',') + " FROM " + this.table + " LIMIT 10";
    };
    EstructuraDbProvider.prototype.sqliteUpsertQueryFormat = function (records) {
        if (records.totalSize == 0) {
            return null;
        }
        console.log("records ", records);
        this.SFrecords = records.records;
        this.columns.unshift('sfId');
        var query = "INSERT OR REPLACE INTO " + this.table;
        var cols = "(" + this.columns.join(',') + ")";
        var values = '?,'.repeat(this.columns.length);
        values = "VALUES (" + values.slice(0, -1) + ")";
        return query + " " + cols + " " + values;
    };
    EstructuraDbProvider.prototype.getRecordsValues = function () {
        var values = [];
        this.SFrecords.forEach(function (record, i) {
            console.log(record);
            values[i] = new Array();
            for (var key in record) {
                values[i].push(record[key]);
            }
            values[i].shift(); //borramos el campo type/url que retorna sf en cada registro
        });
        console.log('values', values);
        return values;
    };
    EstructuraDbProvider.prototype.saveSFrecords = function (query, recordsValues) {
        for (var key in recordsValues) {
            try {
                var saveOk = this.sqlite.query(query, recordsValues[key]);
                console.log('saveOk ');
            }
            catch (e) {
                throw e.message;
            }
        }
        /*if(query != null){
            
            console.log("query insert ",query);
            let insertsOk = await this.sqlite.query(query,sfvalues);
            console.log("insertsOk ",insertsOk);
         }*/
    };
    EstructuraDbProvider.prototype.convertFieldType = function (sfType) {
        switch (sfType) {
            case "STRING":
                return "TEXT";
            case "DOUBLE":
                return "REAL";
            case "PICKLIST": //verificar si sirve que sea TEXT
                return "TEXT";
            case "REFERENCE":
                return "NONE";
            case "TEXTAREA":
                return "TEXT";
            case "URL":
                return "TEXT";
            case "CURRENCY":
                return "REAL";
            case "DATE":
                return "TEXT";
            case "BOOLEAN":
                return "NUMERIC";
            case "PERCENT":
                return "INTEGER";
            case "PHONE":
                return "TEXT";
            default:
                return "NONE";
        }
    };
    EstructuraDbProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            SqliteProvider,
            SalesforceProvider])
    ], EstructuraDbProvider);
    return EstructuraDbProvider;
}());
export { EstructuraDbProvider };
//# sourceMappingURL=estructura-db.js.map