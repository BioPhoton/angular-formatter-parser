# angular-formatter-parser

Angular Formatter Parser - The AngularJS Port


The angular FormatterParser library in a port of the Angular1 `ngModel.$formatter` and `ngModel.§parser` implementation.

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


## Usage:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

```

## Rough release flow
- npm run build
- npm run recommended-bump (lookup for recommended version bump i.e.: patch)
- cd src
- npm version [BUMP_TYPE] -m "chore(release): %s"
- cd ..
- npm run changelog
- npm run github-release
- npm run release

## License

MIT © [Michael Hladky](mailto:michael@hladky.at)
