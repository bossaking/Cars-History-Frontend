import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, UntypedFormControl } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]'
})
export class MatchPasswordDirective {

  constructor() { }

}

export function matchPasswordsValidator(password: UntypedFormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden =  password.value !== control.value;
    return forbidden ? {matchPasswords: true} : null;
  };
}
