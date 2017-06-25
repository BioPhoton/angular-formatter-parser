"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var basic_usage_component_1 = require("./basic-usage.component");
describe('BasicUsageComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [basic_usage_component_1.BasicUsageComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(basic_usage_component_1.BasicUsageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
