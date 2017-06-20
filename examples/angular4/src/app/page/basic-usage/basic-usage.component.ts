import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormatterParserConfig } from 'angular-formatter-parser/struct/formatter-parser-config';

@Component({
  selector: 'app-basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss']
})
export class BasicUsageComponent implements OnInit {


  basicFormGroup: FormGroup;

  fpNameConfig: IFormatterParserConfig;
  fpCouponConfig: IFormatterParserConfig;
  fpCodeConfig: IFormatterParserConfig;

  constructor(private fb: FormBuilder) {
    this.basicFormGroup = this.fb.group(
      {
        name: [],
        couponcode: [],
        code: []
      }
      );

    this.fpNameConfig = {
      formatterParser: [
        { name: 'toCapitalized' }
      ]
    };

    this.fpCouponConfig = {
      formatterParser: [
        {
          name: 'toUpperCase',
          target: 0
        },
        {
          name: 'toLowerCase',
          target: 1
        }
      ]
    };

    this.fpCodeConfig = {
      formatterParser: [
        {
          name: 'maskString',
          params: ['000 000 000', {'0': /[0-9]/}],
          target: 2
        },
        {
          name: 'replaceString',
          params: [/ /g, ''],
          target: 1
        },
      ]
    };

  }

  ngOnInit() {
  }

}
