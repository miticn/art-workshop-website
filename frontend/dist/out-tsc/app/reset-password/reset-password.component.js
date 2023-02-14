import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(activatedRoute, userService) {
        this.activatedRoute = activatedRoute;
        this.userService = userService;
        this.resetPasswordForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
            confirmPassword: new FormControl('', [Validators.required])
        });
        this.validToken = false;
    }
    ngOnInit() {
        this.token = this.activatedRoute.snapshot.paramMap.get('token');
        //send token to backend to verify that it is valid
        this.userService.isTokenValid(this.token).subscribe((res) => {
            this.validToken = res.valid;
        });
    }
    ressetPassword() {
        //send new password to backend to reset password
        this.userService.setNewResetPassword(this.token, this.resetPasswordForm.value.password).subscribe((res) => {
            console.log(res);
        });
    }
};
ResetPasswordComponent = __decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.component.html',
        styleUrls: ['./reset-password.component.css']
    })
], ResetPasswordComponent);
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map