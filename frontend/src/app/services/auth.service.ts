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
  }

  private async init(): Promise<void> {
    await this.refresh();
  }
  
  private loggedin = false;
  private user: User;

  public getUser(): User {
    return this.user;
  }
  public async refresh(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.getSessionUser().subscribe((resp: any) => {
        if(resp['error']){
          this.loggedin = false;
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
        }
        resolve();
      });
    });
  }
  login(username: string, password: string) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.login(username, password).subscribe((resp: any) => {
        location.reload();
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  logout() {
    this.service.logout().subscribe((resp: any) => {
      this.loggedin = false;
      this.user = null;
      location.reload();
    });
  }

  isLoggedIn() {
    return this.loggedin;
  }
}
