import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  HostListener,
  InjectionToken,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicFormElementModel } from '../../dymanic-form-element/model/base/form-control';
import { FormatterParserService } from '../formatter-parser.service';
import { IFormatterParserFn } from '../struct/formatter-parser-function';
/*TEXT-MASK EXCEPTION ==============================================================*/
import { TextMaskService } from './textMask.service';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { ITextMaskConfigOptions } from './struct/textMask-config-options';
/*============================================================== TEXT-MASK EXCEPTION*/

const CONTROL_VALUE_ACCESSOR = {
  name: 'formatterParserValueAccessor',
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormatterParserTextMaskDirective),
  multi: true
};

@Directive({
  inputs: ['config', 'formControlName'],
  selector: '[formatterParserTextMask]',
  providers: [
    CONTROL_VALUE_ACCESSOR
  ]
})
export class FormatterParserTextMaskDirective implements ControlValueAccessor, OnInit {

  // Input binding
  config: DynamicFormElementModel;
  // Input binding
  formControlName: string;

  // Container component reference
  protected formControl: FormControl;

  // html input reference
  protected inputElement: HTMLInputElement;

  /*TEXT-MASK EXCEPTION ==============================================================*/
  protected textMaskConfig: boolean | ITextMaskConfigOptions = false;
  protected textMaskInputElement: any;
  /*============================================================== TEXT-MASK EXCEPTION*/

  private formatterParserView: IFormatterParserFn[] = [];
  private formatterParserModel: IFormatterParserFn[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  constructor(private _elementRef: ElementRef,
              private fps: FormatterParserService,
              //BIG THX to https://github.com/SanderElias for this hint
              @Optional() @Host() @SkipSelf() private fcd: ControlContainer,
              // BIG THX to https://github.com/text-mask/text-mask for the code share
              private tms: TextMaskService) {

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

    /*TEXT-MASK EXCEPTION ==============================================================*/
    if (!!this.textMaskConfig) {
      this.textMaskInputElement.update(rawValue)
    }
    /*============================================================== TEXT-MASK EXCEPTION*/
    else {
      //write value to view (visible text of the form control)
      this.inputElement.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    }

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue || null);
    this.onModelChange(modelValue);
  }


  // Formatter: Model to View
  writeValue(rawValue: any): void {

     ///TEXT-MASK EXCEPTION ==============================================================
     if (!!this.textMaskConfig) {
     this.textMaskInputElement.update(rawValue)
     }
     ///============================================================== TEXT-MASK EXCEPTION
     else {
     //write value to view (visible text of the form control)
     this.inputElement.value = this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, rawValue);
     }

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

    /*TEXT-MASK EXCEPTION ==============================================================*/
    this.textMaskConfig = false;
    /*============================================================== TEXT-MASK EXCEPTION*/

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
            /*TEXT-MASK EXCEPTION ==============================================================*/
            if (formatterConfig.name === 'textMask') {
              this.textMaskConfig = this.tms.getConfig(formatterConfig.params[0], formatterConfig.params[1]);
            }
            /*============================================================== TEXT-MASK EXCEPTION*/
            else {
              this.formatterParserView.push(fPF);
            }
          }
        });


      /*TEXT-MASK EXCEPTION ==============================================================*/
      if (this.textMaskConfig) {
        const config: any = this.textMaskConfig;
        config.inputElement = this.inputElement;

        // a pipe is a function that receives an value and returns an maybe altered value
        // this is exactly the same what our formatterParserFunctions are
        // so we just use them on the textMask input as pipe param :-)

        // if a pipe is already given push it to the view formatter => formatterParserView
        if ('pipe' in config && typeof config.pipe === 'function') {
          let clonedPipe = {...config}.pipe.bind({});
          const fPF: IFormatterParserFn = (conformedValue) => {
            return {name: 'textMask', result: clonedPipe(conformedValue)}
          };
          this.formatterParserView.push(fPF);
        }
        config.pipe = (conformedValue) => {
          return (this.formatterParserView.length <= 0) ? conformedValue : this.formatterParserView.reduce((state: any, transform: IFormatterParserFn) => transform(state).result, conformedValue)
        };

        this.textMaskInputElement = createTextMaskInputElement(config);
      }
      /*============================================================== TEXT-MASK EXCEPTION*/
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
