import { FormatterParserDirective } from './formatter-parser.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { IFormatterParserConfig } from './struct/formatter-parser-config';
import { FormatterParserService } from './formatter-parser.service';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { FormatterParserModule } from './index';


@Component({
    template: `
        <form [formGroup]="fg">
            <input type="text" formControlName="test" [formatterParser]="formatterParserConfig">
        </form>
    `,
})
class TestComponent {

    fg: FormGroup = new FormGroup({'test': new FormControl('')});

    formatterParserConfig: IFormatterParserConfig = {
        formatterParser: [
            {name: 'toUpperCase'}
        ]

    };

}

describe('FormatterParserDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: DebugElement;
    let inputElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormatterParserModule
            ],
            declarations: [
                TestComponent
            ],
            providers: [
                FormatterParserService
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

    });

    xit('should transform value with built in transform function', () => {
        // const inputEl = el.query(By.directive(FormatterParserDirective)).nativeElement;

        inputElement = fixture.debugElement.query(By.css('input'));
        inputElement.triggerEventHandler('mouseover', null);
        fixture.detectChanges();
        //console.log(inputElement.nativeElement.value);

        expect(inputElement.nativeElement.value).toBe('ABC');
        // setInputValue(inputElem, 'ABCdef');
        // expect(inputElem.value).toBe('ABCDEF');
    });

    xit('should transform value with built in transform function and params', () => {
        component.formatterParserConfig = {
            formatterParser: [
                {
                    name: 'replaceString',
                    params: [/[a]/, 'b']
                }
            ]
        };
        const inputElem = el.query(By.directive(FormatterParserDirective)).nativeElement;

        setInputValue(inputElem, 'abc');
        expect(inputElem.value).toBe('abc');
    });


    function setInputValue(inputElem, value) {
        inputElem.value = value;
        inputElem.dispatchEvent(new Event('input'));
    }

});

