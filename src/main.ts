import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { FormatterParserModule } from './index';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(FormatterParserModule);
