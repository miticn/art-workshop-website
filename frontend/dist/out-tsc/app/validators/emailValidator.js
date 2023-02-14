import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export function emailValidator(userService) {
    return (control) => {
        return userService.isEmailFree(control.value).pipe(map(res => {
            return res['free'] ? null : { emailTaken: true };
        }), catchError(() => {
            return of(null);
        }));
    };
}
//# sourceMappingURL=emailValidator.js.map