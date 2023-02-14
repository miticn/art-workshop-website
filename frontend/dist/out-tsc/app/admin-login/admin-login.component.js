import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminLoginComponent = class AdminLoginComponent {
    constructor(service) {
        this.service = service;
        this.msg = "";
        this.username = "";
        this.password = "";
        this.loggedin = false;
    }
    ngOnInit() {
    }
    LogIn() {
        this.service.loginAdmin(this.username, this.password).subscribe((res) => {
            alert(res.msg);
        });
    }
};
AdminLoginComponent = __decorate([
    Component({
        selector: 'app-admin-login',
        templateUrl: './admin-login.component.html',
        styleUrls: ['./admin-login.component.css']
    })
], AdminLoginComponent);
export { AdminLoginComponent };
//# sourceMappingURL=admin-login.component.js.map