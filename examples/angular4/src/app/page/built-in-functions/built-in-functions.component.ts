import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormatterParserConfig } from '../../../../../../dist/struct/formatter-parser-config';

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
      {name: 'toLowerCase'}
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

  fPConformToMaskConfig: IFormatterParserConfig = {
    formatterParser: [
      {
        name: 'conformToMask',
        params: [[/[a]/, '*', /[b]/], '#']
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
