import {Injectable} from '@angular/core'
import {InputContext} from './input-context.interface'
import adjustCaretPosition from './static-vendors/adjustCaretPosition'

@Injectable()
export class InputContextService implements InputContext {

  previousConformedValue = '';
  previousPlaceholder = '';
  currentCaretPosition = 0;
  conformedValue = '';
  rawValue = '';
  placeholderChar = '_';
  placeholder = '_';
  indexesOfPipedChars = [];
  caretTrapIndexes = []

  setSelection(input: HTMLInputElement): void {
    const adjustCaretConfig = {
      previousConformedValue: this.previousConformedValue,
      previousPlaceholder: this.previousPlaceholder,
      currentCaretPosition: this.currentCaretPosition,
      conformedValue: this.conformedValue,
      rawValue: this.rawValue,
      placeholderChar: this.placeholderChar,
      placeholder: this.placeholder,
      indexesOfPipedChars: this.indexesOfPipedChars,
      caretTrapIndexes: this.caretTrapIndexes
    }
    const selectionPosition = adjustCaretPosition(adjustCaretConfig)

    // input.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }


}
