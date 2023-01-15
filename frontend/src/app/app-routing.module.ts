import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { OrgComponent } from './org/org.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "user", component: UserComponent },
  { path: "org", component: OrgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
