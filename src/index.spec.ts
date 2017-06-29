import {inject, TestBed} from '@angular/core/testing'
import {FORMATTER_PARSER} from './formatter-parser.injectionToken'
import {FormatterParserService} from './formatter-parser.service'
import {IFormatterParserFn} from './struct/formatter-parser-function'
import {IFormatterParserResult} from './struct/formatter-parser-result'
import {FormatterParserModule} from './index'


describe('FormatterParserModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormatterParserModule.forRoot()
      ]
    });
  });

  it('should load Module without errors', inject([FormatterParserService], (service: FormatterParserService) => {
    expect(service).toBeTruthy();
  }));

});
