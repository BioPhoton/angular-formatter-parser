import { IFormatterParserFn } from './struct/formatter-parser-function';
import { IFormatterParserResult } from './struct/formatter-parser-result';

export class FormatterParser {

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

}

