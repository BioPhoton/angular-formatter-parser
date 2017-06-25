"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var angular_formatter_parser_1 = require("angular-formatter-parser");
var mask_string_1 = require("./custom-transform-functions/mask-string");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        console.log('CoreModlue: ', parentModule);
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        exports: [
            common_1.CommonModule
        ],
        declarations: [],
        providers: [
            { provide: angular_formatter_parser_1.FORMATTER_PARSER, useValue: mask_string_1.maskString, multi: true }
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf())
], CoreModule);
exports.CoreModule = CoreModule;
