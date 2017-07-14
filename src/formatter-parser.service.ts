import {Inject, Injectable, Optional} from '@angular/core'
import {FormatterParser} from './formatter-parser'
import {FORMATTER_PARSER} from './formatter-parser.injectionToken'
import {IFormatterParserFn} from './struct/formatter-parser-function'

@Injectable()
export class FormatterParserService {

  constructor(@Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: IFormatterParserFn[]) {
  }

  getFormatParseFunction(functionName: string, params?: any[]): IFormatterParserFn | undefined {
    let formatParseFunction: Function;
    if (functionName in FormatterParser) {
      formatParseFunction = FormatterParser[functionName];
    } else if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(formParsFunc => {
        return functionName === formParsFunc.name;
      });
    }

    if (!(typeof formatParseFunction === 'function')) {
      throw new Error(`Formatter or Parser with name ${functionName} 
                            is not provided as a function via FormatterParser 
                            service or FORMATTER_PARSER InjectionToken. 
                            Did you forgot to provide them?`)
    }

    return (params) ? formatParseFunction(...params) : formatParseFunction;
  }

}
