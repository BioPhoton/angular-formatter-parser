import { IFormatterParserFn } from './struct/formatter-parser-function';
import { IFormatterParserResult } from './struct/formatter-parser-result';

export class FormatterParser {

    static toCapitalized: IFormatterParserFn = (value: any): IFormatterParserResult => {

        let transformedValue = value;

        if (typeof value === 'string' || value instanceof String) {
            value = value.toString().toLowerCase().replace(/[^a-zA-Z]./g, function (str) {
                return str.toUpperCase();
            });
            transformedValue = value.charAt(0).toUpperCase() + value.slice(1);
        }

        return {
            name: 'toCapitalized',
            result: transformedValue
        };

    }

    static toUpperCase: IFormatterParserFn = (value: any): IFormatterParserResult => {
        let transformedValue = value;
        if (typeof value === 'string' || value instanceof String) {

            transformedValue = value.toString().toLowerCase().replace(/[a-zA-Z]/g, function (str) {
                return str.toUpperCase();
            });
        }

        return {
            name: 'toUpperCase',
            result: transformedValue
        };
    }

}

