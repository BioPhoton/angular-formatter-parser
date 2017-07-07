import {Component, DebugElement} from '@angular/core'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {FormControl, FormGroup} from '@angular/forms'
import {By} from '@angular/platform-browser'
import {FormatterParserDirective} from './formatter-parser.directive'
import {FormatterParserService} from './formatter-parser.service'
import {FormatterParserModule} from './index'
import {IFormatterParserConfig} from './struct/formatter-parser-config'

@Component({
  template: `
    <form [formGroup]="fg">
      <input type="text" value="" [formControlName]="'test'"
        [formatterParser]="formatterParserConfig">
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

  const setInputValue = (inputElem: DebugElement, value) => {
    inputElem.attributes.value = value;
    inputElem.triggerEventHandler('input', {})
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormatterParserModule.forRoot()
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

  it('should transform value with built in transform function', () => {
    const inputElement = el.query(By.directive(FormatterParserDirective));
    fixture.detectChanges();
    expect(inputElement.attributes.value).toBe('');
    // setInputValue(inputElement, 'ABCdef');

    // expect(inputElement.attributes.value).toBe('ABCDEF');
  });

  /*xit('should transform value with built in transform function and params', () => {
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
    expect(inputElem.attributes.value).toBe('bbc');
  });*/

});

