import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { OrgComponent } from './org/org.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { UserComponent } from './user/user.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { AdminWaitingListComponent } from './admin-waiting-list/admin-waiting-list.component';
import { AuthGuard } from './auth.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { Top5Component } from './top5/top5.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { ChatComponent } from './chat/chat.component';
import { AntiAuth } from './anti-auth.guard';

const routes: Routes = [
  { path: "", canActivate: [AntiAuth], component: IndexComponent },
  { path: "user/:username", canActivate: [AuthGuard], component: UserComponent },
  { path: "user/:username/edit", canActivate: [AuthGuard], component: UserEditComponent },
  { path: "user/:username/cpw", canActivate: [AuthGuard], component: ChangePasswordComponent },
  { path: "org", component: OrgComponent },
  { path: "AdminLogin", canActivate: [AntiAuth], component: AdminLoginComponent },
  { path: "resetPassword", canActivate: [AntiAuth], component: PasswordResetRequestComponent },
  { path: "resetPassword/:token", canActivate: [AntiAuth], component: ResetPasswordComponent },
  { path: "workshops", component: WorkshopsComponent},
  { path: "top5", component: Top5Component},
  { path: "workshop/:id", canActivate: [AuthGuard], component: WorkshopComponent},
  { path: "waitingList", component: AdminWaitingListComponent},
  { path: "becomeOrg", canActivate: [AuthGuard], component: BecomeOrgComponent},
  { path: "chat/:workshopId", canActivate: [AuthGuard], component: ChatComponent}
  /*
  {
    path: 'protected',
    canActivate: [AuthGuard],
    component: ProtectedComponent
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
