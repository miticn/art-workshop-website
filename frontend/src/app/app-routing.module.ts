import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { OrgComponent } from './org/org.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "user", component: UserComponent },
  { path: "org", component: OrgComponent },
  { path: "AdminLogin", component: AdminLoginComponent },
  { path: "resetPassword/:token", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
