import { IPipeResult } from './pipe-result';
export interface IPipeFn {
  (conformedValue:string, config:any):IPipeResult
}
