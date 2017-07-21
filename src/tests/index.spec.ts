import {inject, TestBed} from '@angular/core/testing'
import {FormatterParserService} from '../formatter-parser.service'
import {FormatterParserModule} from '../index'

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
