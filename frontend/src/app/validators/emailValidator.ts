import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsersService } from '../users.service';

export function emailValidator(userService: UsersService): AsyncValidatorFn {
    
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.isEmailFree(control.value).pipe(
            map(res => {
                return res['free'] ? null : { emailTaken: true };
            }),
            catchError(() => {
                return of(null);
            })
        );
    };
}