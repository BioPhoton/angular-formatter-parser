import {InjectionToken} from "@angular/core";
import {IFormatterParserFn} from "./struct/formatter-parser-function";

export const FORMATTER_PARSER: InjectionToken<(IFormatterParserFn)[]> = new InjectionToken<(IFormatterParserFn)[]>('formatterParser');
