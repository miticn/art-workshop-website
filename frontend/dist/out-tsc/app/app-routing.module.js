import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IndexComponent } from './index/index.component';
import { OrgComponent } from './org/org.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { UserComponent } from './user/user.component';
import { WorkshopsComponent } from './workshops/workshops.component';
const routes = [
    { path: "", component: IndexComponent },
    { path: "user", component: UserComponent },
    { path: "org", component: OrgComponent },
    { path: "AdminLogin", component: AdminLoginComponent },
    { path: "resetPassword", component: PasswordResetRequestComponent },
    { path: "resetPassword/:token", component: ResetPasswordComponent },
    { path: "workshops", component: WorkshopsComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map