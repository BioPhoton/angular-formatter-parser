import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormatterParserConfig } from '../../../../../../dist/struct/formatter-parser-config';

@Component({
  selector: 'app-basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.css']
})
export class BasicUsageComponent implements OnInit {


  basicFormGroup: FormGroup;
  formatterParserConfig: IFormatterParserConfig;

  constructor(private fb: FormBuilder) {
    this.basicFormGroup = this.fb.group({name: []});

    this.formatterParserConfig = {
      formatterParser: [
        { name: 'toUpperCase' }
      ]
    }

  }

  ngOnInit() {
  }

}
