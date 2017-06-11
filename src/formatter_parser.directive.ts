import {Directive, ElementRef, forwardRef, Host, HostListener, OnInit, Optional, SkipSelf} from "@angular/core";
import {ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractFormControlModel} from "../../model/base/form-control";
import {DynamicFormService} from "../../services/dynamic-form.service";

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
  config: AbstractFormControlModel;
  // Input binding
  formControlName: string;

  // Container component reference
  formControl: FormControl;

  protected formatterParserView: Function[] = [];
  protected formatterParserModel: Function[] = [];

  constructor(private _elementRef: ElementRef,
              private dfs: DynamicFormService,
              //THX to https://github.com/SanderElias for this hint
              @Optional() @Host() @SkipSelf() private fcd: ControlContainer) {
  }

  ngOnInit(): void {
    this.formControl = (<any>this.fcd).form.controls[this.formControlName];
    this.updateFormatterAndParser();
  }

  onChange = (value: any) => {
    return value;
  };

  onTouched = () => {
    //not implemented
  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Parser: View to Model
  @HostListener('input', ['$event'])
  onControlInput($event: KeyboardEvent) {

    const input = $event.target as HTMLInputElement;
    const value: string = input.value.toString();

    //write value to view (visible text of the form control)
    input.value = this.formatterParserView.reduce((state, transform) => transform(state), value || null);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state, transform) => transform(state), value || null);
    this.onChange(modelValue);
  }

  // Formatter: Model to View
  writeValue(value: any): void {
    const input: HTMLInputElement = this._elementRef.nativeElement;

    //write value to view (visible text of the form control)
    input.value = this.formatterParserView.reduce((state, transform) => transform(state), value);

    //write value to model (value stored in FormControl)
    const modelValue = this.formatterParserModel.reduce((state, transform) => transform(state), value);
    this.formControl.patchValue(modelValue);
  }

  //fetch formatter and parser form config and update props
  updateFormatterAndParser(): void {

    this.formatterParserView = [];
    this.formatterParserModel = [];

    if (!this.config) {
      return
    }

    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach((formatterConfig: any) => {
          const fPF: any = this.dfs.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          const t = formatterConfig.target;

          if (t == 0 || t == 2) {
            this.formatterParserView.push(fPF);
          }
          if (t == 1 || t == 2) {
            this.formatterParserModel.push(fPF);
          }
        });
    }

  }

}
