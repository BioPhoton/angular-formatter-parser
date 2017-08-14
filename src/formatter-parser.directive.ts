import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit, ViewChild
} from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import {FormatterParserCollectorService} from './formatter-parser.service'
import {InputContextService} from './input-context.service'
import {IFormatterParserConfig} from './struct/formatter-parser-config'
import {IFormatterParserFn} from './struct/formatter-parser-function'

declare var Ionic: any;

const CONTROL_VALUE_ACCESSOR = {
  name: 'formatterParserValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserDirective),
  multi: true
};

@Directive({
  selector: '[formatterParser]',
  providers: [
    CONTROL_VALUE_ACCESSOR
  ]
})
export class FormatterParserDirective implements ControlValueAccessor, AfterViewInit {

  @Input()
  formatterParser: IFormatterParserConfig;

  @Input()
  formControlName: string;

  // Container component reference
  protected formControl: FormControl;

  // html input reference
  protected inputElement: HTMLInputElement;

  private formatterParserView: IFormatterParserFn[] = [];
  private formatterParserModel: IFormatterParserFn[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  constructor(
    private _elementRef: ElementRef,
    private fps: FormatterParserCollectorService,
    private inputContext: InputContextService
  ) {

  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  ngAfterViewInit(): void {
    this.inputElement = this.getInputElementRef();
    this.updateFormatterAndParser();
  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const rawValue: any = this.inputElement.value;

    // If there is a reactive FormControl present trigger onTouch
    /* istanbul ignore else */
    if (this.onTouch) {
      this.onTouch();
    }

    // write value to view (visible text of the form control)
    this.inputElement.value = this.formatterParserView
      .reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);

    // write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel
      .reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);

    // If there is a reactive formControl present update its model
    /* istanbul ignore else */
    if (this.onModelChange) {
      this.onModelChange(modelValue);
    }

    // refocus cursor to propper position after input
    this.inputContext.setSelection(this.inputElement);
  }

  // Formatter: Model to View
  writeValue(rawValue: any): void {

    // write value to view (visible text of the form control)
    if (this.inputElement) {
      this.inputElement.value = this.formatterParserView
        .reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);
    }
    // write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel
      .reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);

    // prevent cyclic function calls
    if (rawValue !== modelValue) {
      // If there is a reactive FormControl present update its model
      /* istanbul ignore else */
      if (this.onModelChange) {
        this.onModelChange(modelValue);
      }
    }

  }


  // fetch formatter and parser form config and update props
  updateFormatterAndParser(): void {

    this.formatterParserView = [];
    this.formatterParserModel = [];

    /* istanbul ignore else */
    if (!this.formatterParser) {
      return;
    }

    /* istanbul ignore else */
    if ('formatterParser' in this.formatterParser) {
      // setup formatterParser functions for view and model values
      this.formatterParser.formatterParser
        .forEach((formatterConfig: any) => {
          const targetBoth = 2;
          const fPF: IFormatterParserFn = this.fps.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = (formatterConfig.target === undefined) ? targetBoth : formatterConfig.target;

          // Formatter: Model to View
          if (t === 1 || t === 2) {
            this.formatterParserModel.push(fPF);
          }
          // Parser: View to Model
          if ((t === 0 || t === 2)) {
            this.formatterParserView.push(fPF);
          }
        });

    }

  }

  // get a safe ref to the input element
  private getInputElementRef(): HTMLInputElement {
    let input: HTMLInputElement;
    if (this._elementRef.nativeElement.tagName === 'INPUT') {
      // `textMask` directive is used directly on an input element
      input = this._elementRef.nativeElement;
    } else {
      // `formatterParser` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      input = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0];
    }

    if (!input) {
      throw new Error('You can applied the "formatterParser" directive only on inputs or elements containing inputs');
    }

    return input;
  }

}
