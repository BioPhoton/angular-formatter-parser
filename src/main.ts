import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { FormatterParserModule } from './index';

enableProdMode();

platformBrowserDynamic().bootstrapModule(FormatterParserModule);
