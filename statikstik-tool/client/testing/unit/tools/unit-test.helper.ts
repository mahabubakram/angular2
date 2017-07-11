import {FormControl, FormGroup} from '@angular/forms';

export class UnitTestHelper {

  public static generateRandomString(): string {
    return (Math.random() + 1).toString(36).substring(2, 7);
  }

  public static generateRandomNumber(min: number = 0, max: number = 100): number {
    return Math.random() * (max - min) + min;
  }

  public static getFormControl(form: FormGroup, formGroupName: string, formControlName: string): FormControl {
    return <FormControl>(<FormGroup>form.controls[formGroupName]).controls[formControlName];
  }
}
