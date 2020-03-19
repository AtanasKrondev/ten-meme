import { AbstractControl } from '@angular/forms';
export class PasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;
    let rePassword = control.get('rePassword').value;
    if (password != rePassword) {
      control.get('rePassword').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}