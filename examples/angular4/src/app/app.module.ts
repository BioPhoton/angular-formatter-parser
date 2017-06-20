import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
// Import your library
import { FORMATTER_PARSER, FormatterParserModule } from 'angular-formatter-parser';
// Project specific imports
import { BasicUsageComponent } from './page/basic-usage/basic-usage.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { maskString } from './core/custom-transform-functions/mask-string';

@NgModule({
  declarations: [
    AppComponent,
    BasicUsageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormatterParserModule.forRoot(),
    CoreModule
  ],
  providers: [
    { provide: FORMATTER_PARSER, useValue: maskString, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
