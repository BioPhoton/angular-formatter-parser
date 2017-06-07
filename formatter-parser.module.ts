import { ModuleWithProviders, NgModule } from '@angular/core';

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {FormatterParserTextMaskDirective} from "./text-mask-implementation/formatter-parser-text-mask.directive";
import {FormatterParserService} from "./formatter-parser.service";
import { TextMaskService } from './text-mask-implementation/textMask.service';
import { FormatterParserDirective } from './formatter-parser.directive';

const EXPORTS = [FormatterParserDirective, FormatterParserTextMaskDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [FormatterParserService,TextMaskService]
})
export class FormatterParserModule {

  static forRoot(): ModuleWithProviders {
    return {
      providers: [
        {provide: FormatterParserService, useClass: FormatterParserService},
        {provide: TextMaskService, useClass: TextMaskService}
      ],
      ngModule: FormatterParserModule
    };
  }

}
