import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let PasswordResetRequestComponent = class PasswordResetRequestComponent {
    constructor(userService) {
        this.userService = userService;
        this.resetPasswordRequestForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }
    ngOnInit() {
    }
    resetPasswordRequest() {
        this.userService.resetPasswordRequest(this.resetPasswordRequestForm.value.email).subscribe((res) => { });
    }
};
PasswordResetRequestComponent = __decorate([
    Component({
        selector: 'app-password-reset-request',
        templateUrl: './password-reset-request.component.html',
        styleUrls: ['./password-reset-request.component.css']
    })
], PasswordResetRequestComponent);
export { PasswordResetRequestComponent };
//# sourceMappingURL=password-reset-request.component.js.map