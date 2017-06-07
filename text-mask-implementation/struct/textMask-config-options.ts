import { IPipeFn } from './pipe-function';
export interface ITextMaskConfigOptions {
  mask?: string | (string | RegExp)[] | Function
  guide?: boolean
  placeholderChar?: string
  keepCharPositions?: boolean
  pipe?: false | string | Function | IPipeFn
  showMask?: boolean
}
