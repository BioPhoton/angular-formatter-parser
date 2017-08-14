import {inject, TestBed} from '@angular/core/testing'
import {FormatterParserCollectorService} from '../formatter-parser.service'
import {FormatterParserModule} from '../index'

describe('FormatterParserModule', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormatterParserModule.forRoot()
      ]
    });
  });

  it('should load Module without errors', inject([FormatterParserCollectorService], (service: FormatterParserCollectorService) => {
    expect(service).toBeTruthy();
  }));

});
