import { IFormatterParserFn } from 'angular-formatter-parser/struct/formatter-parser-function';

export function maskString(mask: string, maskPatterns: { [key: string]: RegExp }): IFormatterParserFn {
  return (value: any) => {

    value = (typeof value === 'string' || value instanceof String) ? value : '';
    mask = mask || '';
    maskPatterns = maskPatterns || {};

    let maskedValue: string = '';
    const valueParts: string[] = value.split('');
    const maskParts: string[] = mask.split('');

    while (valueParts.length > 0) {
      let unmaskedChar = valueParts.shift();
    while (unmaskedChar !== null) {
      const maskChar: string = maskParts.shift();
        if (maskChar !== undefined) {
          const maskPattern: Function | RegExp | boolean = maskPatterns[maskChar.toUpperCase()];
          if (maskPattern !== undefined) {
            let check: boolean = false;
            if (typeof maskPattern === 'function') {
              check = maskPattern(unmaskedChar);
            }
            else if (maskPattern instanceof RegExp) {
              check = maskPattern.test(unmaskedChar);
            }
            if (check) {
              maskedValue += unmaskedChar;
            }
            else {
              maskParts.unshift(maskChar);
            }

            unmaskedChar = null;
          }
          else {
            maskedValue += maskChar;
          }
        }
        else {
          unmaskedChar = null;
        }
      }
    }

    return {
      name: "maskString",
      result : maskedValue,
      previous: value
    };
  }

}
