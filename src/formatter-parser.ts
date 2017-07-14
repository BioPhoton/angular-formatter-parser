import {conformToMask as realConformToMask} from './static-vendors/index'
import {IFormatterParserFn} from './struct/formatter-parser-function'
import {IFormatterParserResult} from './struct/formatter-parser-result'
import {IConformToMaskConfig} from './struct/transform-functions/conform-to-mask-config'


export class FormatterParser {

  static toUpperCase: IFormatterParserFn = (value: any): IFormatterParserResult => {
    let transformedValue = value;
    if (typeof value === 'string' || value instanceof String) {
      transformedValue = value.toUpperCase();
    }

    return {
      name: 'toUpperCase',
      result: transformedValue,
      previous: value
    };
  }

  static toLowerCase: IFormatterParserFn = (value: any): IFormatterParserResult => {
    let transformedValue = value;
    if (typeof transformedValue === 'string' || transformedValue instanceof String) {
      transformedValue = transformedValue.toLowerCase();
    }

    return {
      name: 'toLowerCase',
      result: transformedValue,
      previous: value
    };
  }

  static toCapitalized: IFormatterParserFn = (value: any): IFormatterParserResult => {

    let transformedValue = value;

    if (typeof value === 'string' || value instanceof String) {
      transformedValue = transformedValue
        .toLowerCase()
        .split(' ')
        .map(val => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ');
    }

    return {
      name: 'toCapitalized',
      result: transformedValue,
      previous: value
    };

  }

  static replaceString(searchValue: RegExp, replaceValue: string): IFormatterParserFn {

    return (value: any) => {

      let transformedValue = value;

      if (typeof transformedValue === 'string' || transformedValue instanceof String) {
        transformedValue = transformedValue.replace(searchValue, replaceValue);
      }

      const result: IFormatterParserResult = {
        name: 'replaceString',
        result: transformedValue,
        previous: value
      };

      return result;

    };

  }

  static conformToMask(mask: (string | RegExp)[] | Function = [], config: IConformToMaskConfig) {

    return (value: any) => {
      const result: IFormatterParserResult = {
        name: 'conformToMask',
        result: value,
        previous: value
      };

      if (mask && config) {
        value = (typeof value === 'string' || value instanceof String) ? value : '';

        const subResult = realConformToMask(value, mask, config);
        result.result = subResult.conformedValue;
        result.meta = subResult.meta;
      }

      return result;
    }
  }

}
