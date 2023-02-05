import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
export function usernameValidator(userService) {
    return (control) => {
        return userService.isUsernameFree(control.value).pipe(map(res => {
            return res['free'] ? null : { usernameTaken: true };
        }), catchError(() => {
            return of(null);
        }));
    };
}
//# sourceMappingURL=usernameValidator.js.map