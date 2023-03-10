import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

export function usernameValidator(userService: UsersService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.getSessionUser().pipe(
            switchMap(sessionUser => {
                if (sessionUser && (control.value === sessionUser["username"] || sessionUser["type"] === "admin")) {
                    return of(null);
                }
                return userService.isUsernameFree(control.value).pipe(
                    map(res => {
                        return res['free'] ? null : { usernameTaken: true };
                    }),
                    catchError(() => {
                        return of(null);
                    })
                );
            })
        );
    };
}
