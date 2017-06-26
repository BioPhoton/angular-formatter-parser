import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { FormatterParserModule } from 'angular-formatter-parser';

// Project specific imports
import { BasicUsageComponent } from './page/basic-usage/basic-usage.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BuiltInFunctionsComponent } from './pages/built-in-functions/built-in-functions.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicUsageComponent,
    BuiltInFunctionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormatterParserModule.forRoot(),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
