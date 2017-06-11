import { IFormatterParserFn } from './struct/formatter-parser-function';
import { IFormatterParserResult } from './struct/formatter-parser-result';
import { conformToMask as realConformToMask } from 'text-mask-core/dist/textMaskCore';
import { IConformToMaskResult } from './text-mask-implementation/struct/conformToMask-result';
import { IConformToMaskConfigOptions } from './text-mask-implementation/struct/conformToMask-config-options';

export class FormatterParser {

  static charsInLowerAndUppercase = 'a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć';

  static toCapitalized: IFormatterParserFn = (value: any): IFormatterParserResult => {

    if (typeof value === 'string' || value instanceof String) {
      value = value.toString().toLowerCase().replace(/[^a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]./g, function (str) {
        return str.toUpperCase();
      });
    }
    else {
      value = '';
    }

    return {
      name: 'toCapitalized',
      result: value.charAt(0).toUpperCase() + value.slice(1)
    }

  };

  static toUpperCase: IFormatterParserFn = (value: any): IFormatterParserResult => {
    let transformedValue = value;
    if (typeof value === 'string' || value instanceof String) {

      transformedValue = value.toString().toLowerCase().replace(/[a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]/g, function (str) {
        return str.toUpperCase();
      });
    }

    return {
      name: 'toUpperCase',
      result: transformedValue
    };
  };

  static conformToMask(mask: string | (RegExp | string)[] | Function = '', config: IConformToMaskConfigOptions = {}): IFormatterParserFn {

    return (value: any): IFormatterParserResult => {
      value = (typeof value === 'string' || value instanceof String) ? value : '';
      const realResult: IConformToMaskResult = realConformToMask(value, mask, config);
      return {
        name: 'conformToMask',
        result: realResult.conformedValue,
        conformToMaskResult: realResult
      };
    }

  }

  /* Special cases */
  static textMask() {
    // This is a placeholder for the textMask implementation
  }

}

