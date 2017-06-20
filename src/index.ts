import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormatterParserDirective } from './formatter-parser.directive';
import { FormatterParserService } from './formatter-parser.service';
import { FormatterParser } from './formatterParser';

export * from './formatter-parser.directive';
export * from './formatter-parser.service';
export * from './formatterParser';
export * from './formatter-parser.injectionToken';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [FormatterParserDirective],
    exports: [FormatterParserDirective, ReactiveFormsModule]
})
export class FormatterParserModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormatterParserModule,
            providers: [
                 FormatterParserService,
                {provide: FormatterParser, useClass: FormatterParser}
            ]
        };
    }
}
