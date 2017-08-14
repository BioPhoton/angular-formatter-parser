import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FORMATTER_PARSER } from 'angular-formatter-parser';
import { maskString } from './custom-transform-functions/mask-string';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: FORMATTER_PARSER, useValue: maskString, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    console.log('CoreModlue: ', parentModule);
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
