import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private service: UsersService) { 
    this.init().then(() => {
      console.log('AuthService initialization finished');
    });
    delay(1000)
    console.log('AuthService exiting constructor');
  }

  private async init(): Promise<void> {
    await this.refresh();
  }
  
  private created = false;
  private loggedin = false;
  private user: User;

  public getUser(): User {
    return this.user;
  }
  public async refresh(): Promise<void> {
    if(this.created) return;
    return new Promise((resolve, reject) => {
      this.service.getSessionUser().subscribe((resp: any) => {
        if(resp['error']){
          this.loggedin = false;
          this.created = true;
          this.user = null;
        }
        else{
          this.user = {
            firstname: resp.firstname,
            lastname: resp.lastname,
            username: resp.username,
            phone: resp.phone,
            email: resp.email,
            type: resp.type,
            profilePicture: resp.profilePicture,
            verified: resp.verified,
            org: resp.org
          };
          console.log("Local user data: ")
          console.log(this.user)
          this.loggedin = true;
          this.created = true;
        }
        resolve();
      });
    });
  }
  login(username: string, password: string) {
    this.service.login(username, password).subscribe((resp: any) => {
      location.reload();
    });
  }

  logout() {
    this.service.logout().subscribe((resp: any) => {
      this.loggedin = false;
      this.user = null;
    });
  }

  public isLoggedInGuard(): Promise<boolean> {
    return this.refresh().then(() => {
      return this.loggedin;
    });
  }
  isLoggedIn() {
    console.log("Logged in: " + this.loggedin)
    return this.loggedin;
  }
}
