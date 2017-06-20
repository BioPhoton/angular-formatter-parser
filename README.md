# angular-formatter-parser

#### Angular Formatter Parser - The AngularJS Port
This library provides an option to hook into the value flow of inputs and other "editable" html elements.
Easy to implement and elegant to use it also provides the possibility to register custom transform functions over a InjectionToken.

![License](https://img.shields.io/npm/l/angular-formatter-parser.svg)
[![NPM Version](https://img.shields.io/npm/v/angular-formatter-parser.svg)](https://www.npmjs.com/package/angular-formatter-parser)

## Demo

- [x] [angular4 demo with ng-cli](https://github.com/BioPhoton/angular-formatter-parser/tree/master/examples/angular4)
- [x] [plunkr demo](https://embed.plnkr.co/7xFXTccR1hfLGbPBTjai/)


![Angular-Formatter-Psrser](https://raw.githubusercontent.com/BioPhoton/angular-formatter-parser/master/resources/demo.gif)

## Basic Usage:

### Implement Library

``` bash
$ npm install angular-formatter-parser --save
```

``` typescript
// app.module.ts
...
// IMPORT YOUR LBRARY
import { FormatterParserModule } from 'angular-formatter-parser';

@NgModule({
  imports: [
    ...
    FormatterParserModule.forRoot();
  ]
  ...
})
export class AppModule { }

```


### Create formatterParser config object

``` typescript
// app.component.ts
...
import { IFormatterParserConfig } from 'angular-formatter-parser/struct/formatter-parser-config';

@Component({
  selector: 'app-basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss']
})
export class BasicUsageComponent {

  fPConfig: IFormatterParserConfig = {
    formatterParser:[
     { name: 'toCapitalized' }
    ]
  }

  constructor() { }

}

```


### Use directive with config object

``` html
// app.component.html
<input type="text" [formatterParser]="fPConfig">

```


## Usage with Reactive Forms

### Create formatterParser config object

``` typescript
// app.component.ts

...
export class BasicUsageComponent {

  fPConfig: IFormatterParserConfig = {
    ...
  }

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.basicFormGroup = this.fb.group({ name: [] });
  }

}
```


### Set formGroup and formControlName

``` html
// app.component.html
<form [formGroup]="formGroup">
  <input type="text" formControlName="name" [formatterParser]="fPConfig">
</form>
```


### Specify the target (transform the value of the view or the model)

``` typescript
// app.component.ts
...
export class BasicUsageComponent {

  fPConfig: IFormatterParserConfig = {
    formatterParser:[
     //0 for view, 1 for model, 2 or nothing for both
     { name: 'toCapitalized', target: 0  }
    ]
  }

}

```


### Use multiple transform functions

``` typescript
// app.component.ts
...
  fPConfig: IFormatterParserConfig = {
    formatterParser:[
     { name: 'toCapitalized', target: 0},
     { name: 'replaceString',  params: [/ /g, ''], target: 1 }
    ]
  }
...
```

## Use custom transform function

### Create custom function

``` typescript
//add-questionmark-transform.ts
import { IFormatterParserFn } from 'angular-formatter-parser/struct/formatter-parser-function';

export function addQuestionmark(value:any): IFormatterParserResult {
    const transformadValue = value;
    const result:IFormatterParserResult = {
      name: "addQuestionmark",
      result : transformadValue+'?',
      previous: value
    };

    return result;
}

```

### Provide the function over the FORMATTER_PARSER token

``` typescript
// app.module.ts

...
// IMPORT FORMATTER_PARSER
import { FORMATTER_PARSER, FormatterParserModule } from 'angular-formatter-parser';
...

@NgModule({
  ...
  providers: [
    { provide: FORMATTER_PARSER, useValue: addQuestionmark, multi: true }
  ]
  ...
})
export class AppModule {

}

```

### Use custom transform function in config object

``` typescript
// app.component.ts
...
export class BasicUsageComponent {

  fPConfig: IFormatterParserConfig = {
    formatterParser:[
     { name: 'addQuestionMark' }
    ]
  }

}

```



# What it is
The angular FormatterParser library in a port of the Angular 1.x `ngModel.$formatter` and `ngModel.§parser` implementation.

It is implemented as an configurable directive which mimics the angular reactive-forms validation.

Like the `Validators` service provides a set default validation functions there is a `FormatterParser` service that provides a set of default transform functions.

When you custom a custom validator you implement the `ValidatorFn` on your custom validation function.
Then you implement `ControlValueAccessor` and use the `NG_VALIDATORS` token to hook into the validation section and provide your custom function as a validator.

Same with transform functions with a little more options. As you know in angular1 we have `$parser` and `$formatter`.
`$parser`, the array of transform functions that are called when the model changes and updates the `HtmlInputElement` value.
And `$formatter`, the array of transform functions that are called when the `HtmlInputElement` fires it's input event with changes and updates the model.

We hook into the two directions by using the `ControlValueAccessor` for the `$formatter` direction, and the `@HostListener('input')` to hook into the `$parser` direction.

To register our transform functions we use the `FORMATTER_PARSER` token to provide our functions

To apply validators to a `FormControl` you setup an array of validator functions, default or custom and provide it under the validators key in the `FormControl` constructor parmas.

To apply transform functions to a `FormControl` use use the `formatterParser` directive which also binds a config array.
But instead of providing an array of validator functions use just provide an array of strings that are the name of the transform functions. the directive automatically recogizes the strings and finds the related transform function.
Your custom transform functions can be registered under `FORMATTER_PARSER`, similar as you would with `NG_VALIDATORS`.


# License

MIT © [Michael Hladky](mailto:michael@hladky.at)

Copyright 2017 [Michael Hladky](mailto:michael@hladky.at). All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at [angular-formatter-parser](https://github.com/BioPhoton/angular-formatter-parser/blob/master/LICENSE.txt)