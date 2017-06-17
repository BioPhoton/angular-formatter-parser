import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormatterParserDirective } from './formatter-parser.directive';
import { FormatterParserService } from './formatter-parser.service';
import { FormatterParserTextMaskDirective } from './text-mask-implementation/formatter-parser-text-mask.directive';
import { TextMaskService } from './text-mask-implementation/textMask.service';
import { FormatterParser } from './formatterParser';

export * from './formatter-parser.directive';
export * from './formatter-parser.service';
export * from './text-mask-implementation/formatter-parser-text-mask.directive';
export * from './text-mask-implementation/textMask.service';
export * from './formatterParser'

const EXPORTS = [
    FormatterParserDirective,
    FormatterParserTextMaskDirective
];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [EXPORTS],
    exports: [EXPORTS]
})
export class FormatterParserModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormatterParserModule,
            providers: [
                FormatterParserService,
                TextMaskService,
                {provide: FormatterParser, useClass: FormatterParser}
            ]
        };
    }
}
