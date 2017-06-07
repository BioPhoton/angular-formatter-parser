import { Directive, ElementRef, forwardRef, Host, HostListener, OnInit, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicFormElementModel } from '../dymanic-form-element/model/base/form-control';
import { FormatterParserService } from './formatter-parser.service';
import { IFormatterParserFn } from './struct/formatter-parser-function';

const CONTROL_VALUE_ACCESSOR = {
  name: 'formatterParserValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserDirective),
  multi: true
};

@Directive({
  inputs: ['config', 'formControlName'],
  selector: '[formatterParser]',
  providers: [
    CONTROL_VALUE_ACCESSOR
  ]
})
export class FormatterParserDirective implements ControlValueAccessor, OnInit {

  // Input binding
  config: DynamicFormElementModel;
  // Input binding
  formControlName: string;

  // Container component reference
  protected formControl: FormControl;

  // html input reference
  protected inputElement: HTMLInputElement;

  private formatterParserView: IFormatterParserFn[] = [];
  private formatterParserModel: IFormatterParserFn[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  constructor(private _elementRef: ElementRef,
              private fps: FormatterParserService,
              //BIG THX to https://github.com/SanderElias for this hint
              @Optional() @Host() @SkipSelf() private fcd: ControlContainer) {

  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }


  ngOnInit(): void {
    this.formControl = (<any>this.fcd).form.controls[this.formControlName];
    this.inputElement = this.getInputElementRef();
    this.updateFormatterAndParser();

  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {
    const rawValue: any = this.inputElement.value;

    //write value to view (visible text of the form control)
    this.inputElement.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    this.onModelChange(modelValue);
  }


  // Formatter: Model to View
  writeValue(rawValue: any): void {

    //write value to view (visible text of the form control)
    this.inputElement.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);
    // prevent cyclic function calls
    if (rawValue !== modelValue) {
      // @TODO consider other way to call patchValue
      this.formControl.patchValue(modelValue);
    }

  }


  //fetch formatter and parser form config and update props
  updateFormatterAndParser(): void {

    this.formatterParserView = [];
    this.formatterParserModel = [];

    if (!this.config) {
      return;
    }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const targetBoth: number = 2;
          const fPF: IFormatterParserFn = this.fps.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = (formatterConfig.target === undefined) ? targetBoth : formatterConfig.target;

          if (t == 1 || t == 2) {
            this.formatterParserModel.push(fPF);
          }

          if ((t == 0 || t == 2)) {
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
      input = this._elementRef.nativeElement
    } else {
      // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      input = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0]
    }

    if (!input) {
      throw new Error('You can applied the "formatterParser" directive only on inputs or elements containing inputs');
    }

    return input;
  }

}
