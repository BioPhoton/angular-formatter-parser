import { Injectable } from '@angular/core';
import { ITextMaskConfigOptions } from './struct/textMask-config-options';
import { createAutoCorrectedDatePipe, createNumberMask, emailMask } from 'text-mask-addons/dist/textMaskAddons';
import { FormatterParserService } from '../formatter-parser.service';
import { IFormatterParserFn } from '../struct/formatter-parser-function';
import { ibanMask } from 'app/modules/dynamic-form-addons/payment/sepa/formatter-parser/iban-mask';


@Injectable()
export class TextMaskService {

  static placeholderChars = {
    whitespace: '\u2000',
    underscore: '_'
  };

  static alphabetic = /[A-Z]/i;
  static digit = /\d/;

  static formatterParserToPipe(fpF:IFormatterParserFn) {
    return (value) => {
      return fpF(value).result;
    };
  }

  constructor(private fps: FormatterParserService) {

  }

  getBasicConfig(config: ITextMaskConfigOptions = {}): ITextMaskConfigOptions {

    const safeConfig: ITextMaskConfigOptions = {};

    if ('mask' in config) {
      safeConfig.mask = config.mask
    }

    if ('guide' in config) {
      safeConfig.guide = config.guide
    }

    if ('pipe' in config) {
      if (typeof config.pipe === 'string' || config.pipe instanceof String) {
        safeConfig.pipe = (value) => {
          return this.fps.getFormatParseFunction(config.pipe as string)(value).result
        };
      }
      else {
        safeConfig.pipe = config.pipe
      }
    }

    if ('placeholderChar' in config) {
      safeConfig.placeholderChar = config.placeholderChar
    }

    if ('keepCharPositions' in config) {
      safeConfig.keepCharPositions = config.keepCharPositions
    }

    if ('showMask' in config) {
      safeConfig.showMask = config.showMask;
    }

    return safeConfig;
  }

  getConfig(config: ITextMaskConfigOptions, addon?: { name, config }): ITextMaskConfigOptions {
    const safeConfig: ITextMaskConfigOptions = this.getBasicConfig(config);

    const addonName = (addon && 'name' in addon) ? addon.name : '';
    switch (addonName) {
      case 'createNumberMask':
        const numberMask = createNumberMask(addon.config);
        safeConfig.mask = numberMask;
        break;
      case 'emailMask':
        safeConfig.mask = emailMask;
        break;
      case 'createAutoCorrectedDatePipe':
        safeConfig.pipe = createAutoCorrectedDatePipe('mm/dd/yyyy');
        safeConfig.keepCharPositions = true;
        break;
      case 'ibanMask':
      case 'ibanMaskStrict':
        const toUpperCase:IFormatterParserFn = this.fps.getFormatParseFunction('toUpperCase');
        safeConfig.mask = this.fps.getFormatParseFunction(addonName);
        safeConfig.pipe = TextMaskService.formatterParserToPipe(toUpperCase);
        break;
    }


    return safeConfig;
  }

}
