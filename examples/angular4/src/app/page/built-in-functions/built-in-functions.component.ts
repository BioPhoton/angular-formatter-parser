import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {IFormatterParserConfig} from 'angular-formatter-parser/struct/formatter-parser-config'
import {IConformToMaskConfig} from 'angular-formatter-parser/struct/transform-functions/conform-to-mask-config'

@Component({
  selector: 'app-built-in-functions',
  templateUrl: './built-in-functions.component.html',
  styleUrls: ['./built-in-functions.component.scss']
})
export class BuiltInFunctionsComponent implements OnInit {

  basicFormGroup: FormGroup;

  fPToUpperCaseConfig: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toUpperCase'}
    ]
  };

  fPToLowerCaseConfig: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toLowerCase'}
    ]
  };

  fPToCapitalizedConfig: IFormatterParserConfig = {
    formatterParser: [
      {name: 'toCapitalized'}
    ]
  };

  fPReplaceStringConfig: IFormatterParserConfig = {
    formatterParser: [
      {
        name: 'replaceString',
        params: [/[a]/, '*']
      }
    ]
  };

  cTMC: IConformToMaskConfig = {
    guide: false,
    // placeholderChar: '_',
    keepCharPositions: true,
    // placeholder: ' ',
    // previousConformedValue: '',
    currentCaretPosition: 0
  };

  fPConformToMaskConfig: IFormatterParserConfig = {
    formatterParser: [
      {
        name: 'conformToMask',
        params: [
          [/[a-zA-Z]/, '*', /[a-zA-Z]/],
          this.cTMC
        ]
      }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.basicFormGroup = this.fb.group(
      {
        toUpperCase: [],
        toLowerCase: [],
        toCapitalized: [],
        replaceString: [],
        conformToMask: []
      }
    );

  }

  ngOnInit() {
  }

}
