var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var SqliteProvider = /** @class */ (function () {
    function SqliteProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.db = null;
    }
    SqliteProvider.prototype.setDatabase = function (db) {
        if (this.db === null) {
            this.db = db;
        }
    };
    SqliteProvider.prototype.query = function (sql, params) {
        if (params != null) {
            return this.db.executeSql(sql, params);
        }
        return this.db.executeSql(sql, []);
    };
    SqliteProvider.prototype.upsert = function (objName, fields) {
        var sql = "INSERT OR REPLACE INTO describe(nombreObj, campos) VALUES (?, ?)";
        var values = [objName, fields];
        return this.db.executeSql(sql, values);
    };
    SqliteProvider.prototype.get = function (objName) {
        var sql = (objName) ? "Select * FROM describe where nombreObj = (?) " : "Select * FROM describe";
        var values = (objName) ? [objName] : [];
        return this.db.executeSql(sql, values);
    };
    SqliteProvider.prototype.drop = function (tableName) {
        var sql = "delete from " + tableName;
        return this.db.executeSql(sql, []);
    };
    SqliteProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Storage])
    ], SqliteProvider);
    return SqliteProvider;
}());
export { SqliteProvider };
//# sourceMappingURL=sqlite.js.map