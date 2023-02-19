import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { OrgComponent } from './org/org.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { AdminWaitingListComponent } from './admin-waiting-list/admin-waiting-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { WorkshopComponent } from './workshop/workshop.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageCommentComponent } from './message-comment/message-comment.component';
import { Top5Component } from './top5/top5.component';
import { WorkshopTableComponent } from './workshop-table/workshop-table.component';
import { BecomeOrgComponent } from './become-org/become-org.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ChatComponent } from './chat/chat.component';
import { MsgComponent } from './msg/msg.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    OrgComponent,
    MenuComponent,
    RegisterComponent,
    IndexComponent,
    AdminLoginComponent,
    ResetPasswordComponent,
    PasswordResetRequestComponent,
    WorkshopsComponent,
    AdminWaitingListComponent,
    CustomModalComponent,
    WorkshopComponent,
    UserEditComponent,
    ChangePasswordComponent,
    MessageCommentComponent,
    Top5Component,
    WorkshopTableComponent,
    BecomeOrgComponent,
    ChatComponent,
    MsgComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FontAwesomeModule,
    GooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
