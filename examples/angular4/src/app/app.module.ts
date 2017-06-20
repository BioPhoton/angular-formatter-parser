import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { FormatterParserModule} from 'angular-formatter-parser';
import { RouterModule, Routes } from '@angular/router';
import { BasicUsageComponent } from './page/basic-usage/basic-usage.component';
import { ReactiveFormsModule } from '@angular/forms';

const ROOTS: Routes = [
  {
    path: '',
    redirectTo: 'basic-usage',
    pathMatch: 'full'
  },
  {
    path: 'basic-usage',
    component: BasicUsageComponent
  },
  {
    path: '**',
    redirectTo: 'basic-usage',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BasicUsageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROOTS),
    FormatterParserModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
