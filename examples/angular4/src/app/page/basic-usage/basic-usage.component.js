"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var BasicUsageComponent = (function () {
    function BasicUsageComponent(fb) {
        this.fb = fb;
        this.basicFormGroup = this.fb.group({
            name: [],
            couponcode: [],
            code: []
        });
        this.fpNameConfig = {
            formatterParser: [
                { name: 'toCapitalized' }
            ]
        };
        this.fpCouponConfig = {
            formatterParser: [
                {
                    name: 'toUpperCase',
                    target: 0
                },
                {
                    name: 'toLowerCase',
                    target: 1
                }
            ]
        };
        this.fpCodeConfig = {
            formatterParser: [
                {
                    name: 'maskString',
                    params: ['000 000 000', { '0': /[0-9]/ }],
                    target: 2
                },
                {
                    name: 'replaceString',
                    params: [/ /g, ''],
                    target: 1
                },
            ]
        };
    }
    BasicUsageComponent.prototype.ngOnInit = function () {
    };
    return BasicUsageComponent;
}());
BasicUsageComponent = __decorate([
    core_1.Component({
        selector: 'app-basic-usage',
        templateUrl: './basic-usage.component.html',
        styleUrls: ['./basic-usage.component.scss']
    })
], BasicUsageComponent);
exports.BasicUsageComponent = BasicUsageComponent;
