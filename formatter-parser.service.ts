import {FORMATTER_PARSER} from "./formatter-parser.injectionToken";
import {Inject, Injectable, Optional} from "@angular/core";
import {IFormatterParserFn} from "./struct/formatter-parser-function";
import {FormatterParser} from "app/modules/formatter-parser/formatterParser";

@Injectable()
export class FormatterParserService {

  constructor(@Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: IFormatterParserFn[]) {
  }

  getFormatParseFunction(functionName: string, params?: any[]): IFormatterParserFn | undefined {
    let formatParseFunction: Function;
    if (functionName in FormatterParser) {
      formatParseFunction = FormatterParser[functionName];
    }
    else if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(formParsFunc => {
        return functionName === formParsFunc.name;
      });
    } else {
      throw new Error(`No function provided via FORMATTER_PARSER. Did you forgot to provide them?`);
    }

    if (!(typeof formatParseFunction === "function")) {
      throw new Error(`Formatter or Parser with name ${functionName} is not provided as a function via FormatterParser service or FORMATTER_PARSER InjectionToken.`);
    }

    return (params) ? formatParseFunction(...params) : formatParseFunction;
  }

}
