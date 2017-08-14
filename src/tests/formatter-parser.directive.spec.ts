import {Component, DebugElement, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {FormatterParserDirective} from '../formatter-parser.directive';
import {FormatterParserCollectorService} from '../formatter-parser.service';
import {FormatterParserModule} from '../index';
import {IFormatterParserConfig} from '../struct/formatter-parser-config';

@Component({
  selector: 'content-component',
  template: `
    <p>
      This is the component that displays formatter parser in the over
      ng-content
    </p>
    <ng-content></ng-content>
  `,
})
class NgContentComponent {
}

@Component({
  selector: 'wrap-component',
  template: `
    <p>
      This is the component that displays formatter parser in the over
      ng-content
    </p>
    <input type="text" value="" [formControlName]="name" id="wrapped">
  `,
})
class WrapContentComponent {
  @Input()
  name: string;
}

@Component({
  template: `
    <form [formGroup]="fg">
      <input type="text" value="" [formControlName]="'both'" id="both"
        [formatterParser]="formatterParserConfigBasic">
      <input type="text" value="" [formControlName]="'format'" id="format"
        [formatterParser]="formatterParserConfigFormat">
      <input type="text" value="" [formControlName]="'parse'" id="parse"
        [formatterParser]="formatterParserConfigParse">
      <input type="text" value="" [formControlName]="'params'" id="params"
        [formatterParser]="formatterParserConfigParams">
      <input type="text" value="" [formControlName]="'empty'" id="empty"
        [formatterParser]>
      <content-component>
        <input type="text" value="" id="content" [formControlName]="'content'"
          [formatterParser]="formatterParserConfigContent">
      </content-component>
      <!--   
      <wrap-component [name]="'wrapped'"></wrap-component>
      -->
    </form>
  `,
})
class TestComponent {
  fg: FormGroup = new FormGroup({
    'both': new FormControl(''),
    'format': new FormControl(''),
    'parse': new FormControl(''),
    'params': new FormControl(''),
    'empty': new FormControl(''),
    'content': new FormControl(''),
    'wrapped': new FormControl('')
  });
  formatterParserConfigBasic: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase'}
    ]
  };
  formatterParserConfigFormat: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase', target: 1}
    ]
  };
  formatterParserConfigParse: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase', target: 0}
    ]
  };
  formatterParserConfigParams: IFormatterParserConfig = {
    formatterParser: [
      {name: 'replaceString', params: [/[a]/g, 'b']}
    ]
  };

  formatterParserConfigWrapped: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase'}
    ]
  };

  formatterParserConfigContent: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase'}
    ]
  }
}

describe('FormatterParserDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let el: DebugElement;

  let bothInput: DebugElement;
  let bothInputControl: AbstractControl;
  let formatInput: DebugElement;
  let formatInputControl: AbstractControl;
  let parseInput: DebugElement;
  let parseInputControl: AbstractControl;
  let paramsInput: DebugElement;
  let paramsInputControl: AbstractControl;
  let emptyInput: DebugElement;
  let emptyInputControl: AbstractControl;
  let contentInput: DebugElement;
  let contentInputControl: AbstractControl;
  let wrappedInput: DebugElement;
  let wrappedInputControl: AbstractControl;

  function setInputValue(inputElem: DebugElement, value) {
    inputElem.nativeElement.value = value;
    inputElem.triggerEventHandler('input', {target: {value: value}});
    fixture.detectChanges()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormatterParserModule.forRoot()
      ],
      declarations: [
        NgContentComponent,
        WrapContentComponent,
        TestComponent
      ],
      providers: [
        FormatterParserCollectorService
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    bothInput = el.query(By.css('#both'));
    bothInputControl = component.fg.get('both');
    formatInput = el.query(By.css('#format'));
    formatInputControl = component.fg.get('format');
    parseInput = el.query(By.css('#parse'));
    parseInputControl = component.fg.get('parse');
    paramsInput = el.query(By.css('#params'));
    paramsInputControl = component.fg.get('params');
    emptyInput = el.query(By.css('#empty'));
    emptyInputControl = component.fg.get('empty');
    contentInput = el.query(By.css('#content'));
    contentInputControl = component.fg.get('content');
    wrappedInput = el.query(By.css('#wrapped'));
    wrappedInputControl = component.fg.get('wrapped')

  });

  it('should format model value to view value with built in transform function', () => {
    fixture.detectChanges();
    expect(formatInputControl.value).toBe('');
    formatInputControl.setValue('ABCdef');
    expect(formatInputControl.value).toBe('ABCDEF')
  });

  it('should parse view value to model value with built in transform function', () => {
    fixture.detectChanges();
    setInputValue(parseInput, 'ABCdef');
    expect(parseInput.nativeElement.value).toBe('ABCDEF')
  });

  it('should transform model and view value with built in transform function', () => {
    const inputValue = 'ABCdef';
    const resultValue = 'ABCDEF';
    fixture.detectChanges();
    // set model value
    setInputValue(bothInput, inputValue);
    expect(bothInput.nativeElement.value).toBe(resultValue);
    expect(bothInputControl.value).toBe(resultValue);
    // reset
    setInputValue(bothInput, '');
    fixture.detectChanges();
    expect(bothInput.nativeElement.value).toBe('');
    expect(bothInputControl.value).toBe(null);
    // set view value
    setInputValue(bothInput, inputValue);
    expect(bothInput.nativeElement.value).toBe(resultValue);
    expect(bothInputControl.value).toBe(resultValue)
  });

  it('should transform value with built in transform function and params', () => {
    fixture.detectChanges();
    const inputValue = 'abc';
    const resultValue = 'bbc';
    fixture.detectChanges();
    // set model value
    setInputValue(paramsInput, inputValue);
    expect(paramsInput.nativeElement.value).toBe(resultValue);
    expect(paramsInputControl.value).toBe(resultValue);
    // reset
    setInputValue(paramsInput, '');
    fixture.detectChanges();
    expect(paramsInput.nativeElement.value).toBe('');
    expect(paramsInputControl.value).toBe(null);
    // set view value
    setInputValue(paramsInput, inputValue);
    expect(paramsInput.nativeElement.value).toBe(resultValue);
    expect(paramsInputControl.value).toBe(resultValue)
  });

  it('should pass value with empty config', () => {
    fixture.detectChanges();
    const inputValue = 'abc';
    const resultValue = 'abc';
    fixture.detectChanges();
    // set model value
    setInputValue(emptyInput, inputValue);
    expect(emptyInput.nativeElement.value).toBe(resultValue);
    expect(emptyInputControl.value).toBe(resultValue);
    // reset
    setInputValue(emptyInput, '');
    fixture.detectChanges();
    expect(emptyInput.nativeElement.value).toBe('');
    expect(emptyInputControl.value).toBe(null);
    // set view value
    setInputValue(emptyInput, inputValue);
    expect(emptyInput.nativeElement.value).toBe(resultValue);
    expect(emptyInputControl.value).toBe(resultValue)
  });

  it('should transform model and view value with built in transform function in content section', () => {
    const inputValue = 'ABCdef';
    const resultValue = 'ABCDEF';
    fixture.detectChanges();
    // set model value
    setInputValue(contentInput, inputValue);
    expect(contentInput.nativeElement.value).toBe(resultValue);
    expect(contentInputControl.value).toBe(resultValue);
    // reset
    setInputValue(contentInput, '');
    fixture.detectChanges();
    expect(contentInput.nativeElement.value).toBe('');
    expect(contentInputControl.value).toBe(null);
    // set view value
    setInputValue(contentInput, inputValue);
    expect(contentInput.nativeElement.value).toBe(resultValue);
    expect(contentInputControl.value).toBe(resultValue)
  });

  xit('should transform model and view value with built in transform function on wrapped inputs', () => {
    const inputValue = 'ABCdef';
    const resultValue = 'ABCDEF';
    fixture.detectChanges();
    // set model value
    setInputValue(wrappedInput, inputValue);
    expect(wrappedInput.nativeElement.value).toBe(resultValue);
    expect(wrappedInputControl.value).toBe(resultValue);
    // reset
    setInputValue(wrappedInput, '');
    fixture.detectChanges();
    expect(wrappedInput.nativeElement.value).toBe('');
    expect(wrappedInputControl.value).toBe(null);
    // set view value
    setInputValue(wrappedInput, inputValue);
    expect(wrappedInput.nativeElement.value).toBe(resultValue);
    expect(wrappedInputControl.value).toBe(resultValue)
  })

});

@Component({
  template: `
    <div [formatterParser]="false"></div>`
})
class ErrorTestComponent {
}

describe('FormatterParserDirective Errors', () => {
  let fixture: ComponentFixture<ErrorTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormatterParserModule.forRoot()
      ],
      declarations: [
        ErrorTestComponent
      ],
      providers: [
        FormatterParserCollectorService
      ]
    })

  });

  it('should throw if not input is present', () => {
    const emptyConfigMessage = 'You can applied the "formatterParser" directive only on inputs or elements containing inputs';

    expect(() => {
      fixture = TestBed.createComponent(ErrorTestComponent);
      fixture.detectChanges()
    }).toThrowError(emptyConfigMessage)
  })

});


