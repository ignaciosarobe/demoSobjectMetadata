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
var DescribeProvider = /** @class */ (function () {
    function DescribeProvider(http, storage) {
        this.http = http;
        this.storage = storage;
        this.db = null;
    }
    DescribeProvider.prototype.setDatabase = function (db) {
        if (this.db === null) {
            this.db = db;
        }
    };
    DescribeProvider.prototype.createTable = function () {
        var sql = "create table if not exists describe(nombreObj TEXT PRIMARY KEY , campos TEXT)";
        this.db.executeSql(sql, []).then(function () {
            console.log("tabla describe creada con exito");
        }).catch(function (error) { return console.log(error); });
    };
    DescribeProvider.prototype.upsert = function (objName, fields) {
        var sql = "INSERT OR REPLACE INTO describe(nombreObj, campos) VALUES (?, ?)";
        var values = [objName, fields];
        return this.db.executeSql(sql, values);
    };
    DescribeProvider.prototype.get = function (objName) {
        var sql = (objName) ? "Select * FROM describe where nombreObj = (?) " : "Select * FROM describe";
        var values = (objName) ? [objName] : [];
        return this.db.executeSql(sql, values);
    };
    DescribeProvider.prototype.drop = function (tableName) {
        var sql = "delete from " + tableName;
        return this.db.executeSql(sql, []);
    };
    DescribeProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, Storage])
    ], DescribeProvider);
    return DescribeProvider;
}());
export { DescribeProvider };
//# sourceMappingURL=describe.js.map