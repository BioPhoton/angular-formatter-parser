import {inject, TestBed} from '@angular/core/testing'
import {FormatterParser} from './formatter-parser'
import {IFormatterParserResult} from './struct/formatter-parser-result'

describe('FormatterParser', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be accessible', inject([], () => {
    expect(FormatterParser).toBeTruthy();
  }));

  it('toUpperCase should work', inject([], () => {
    const expectedResult: IFormatterParserResult = {
      name: 'toUpperCase',
      previous: 'abc',
      result: 'ABC'
    };
    expect(FormatterParser.toUpperCase('abc')).toEqual(expectedResult);
  }));

  it('toLowerCase should work', inject([], () => {
    const expectedResult: IFormatterParserResult = {
      name: 'toLowerCase',
      previous: 'ABC',
      result: 'abc'
    };
    expect(FormatterParser.toLowerCase('ABC')).toEqual(expectedResult);
  }));

  it('toCapitalized should work', inject([], () => {
    const expectedResult: IFormatterParserResult = {
      name: 'toCapitalized',
      previous: 'abc abc',
      result: 'Abc Abc'
    };
    expect(FormatterParser.toCapitalized('abc abc')).toEqual(expectedResult);
  }));

  it('replaceString should work', inject([], () => {
    const expectedResult: IFormatterParserResult = {
      name: 'replaceString',
      previous: 'abc',
      result: 'bbc'
    };
    const replaceString = FormatterParser.replaceString(/[a]/, 'b');
    expect(replaceString('abc')).toEqual(expectedResult);
  }));

  it('conformToMask should work', inject([], () => {
    const expectedResult: IFormatterParserResult = {
      name: 'conformToMask',
      previous: 'abc',
      result: 'a*b',
      meta: {
        someCharsRejected: false
      }
    };
    const conformToMask = FormatterParser.conformToMask([/[a]/, '*', /[b]/], {
      guide: true
    });
    expect(conformToMask('abc')).toEqual(expectedResult);
  }));

});
