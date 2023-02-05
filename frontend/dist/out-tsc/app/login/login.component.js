import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.user = null;
        this.username = "";
        this.password = "";
        this.msg = "";
        this.loggedin = false;
    }
    refresh() {
        this.service.getSessionUser().subscribe((resp) => {
            console.log(resp);
            if (resp['error']) {
                this.loggedin = false;
            }
            else {
                this.user = resp.user;
                console.log(this.user);
                this.loggedin = true;
            }
        });
    }
    ngOnInit() {
        this.refresh();
    }
    LogIn() {
        if (this.username == "" || this.password == "") {
            this.msg = 'Sva polja moraju biti popunjena';
            return;
        }
        this.service.login(this.username, this.password).subscribe((resp) => {
            this.refresh();
        });
    }
    LogOut() {
        this.service.logout().subscribe((resp) => {
            this.loggedin = false;
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map