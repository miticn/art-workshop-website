import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrgComponent } from './org/org.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "user", component: UserComponent },
  { path: "org", component: OrgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
