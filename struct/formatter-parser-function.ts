import {IFormatterParserResult} from "./formatter-parser-result";
export interface IFormatterParserFn {
  (value: any, param?: any): IFormatterParserResult;
}
