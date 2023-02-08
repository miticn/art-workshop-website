import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private service: UsersService) { }
  private loggedin = false;
  private user: User;

  public getUser(): User {
    return this.user;
  }
  public refresh(): void {
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
    });
  }
  login(username: string, password: string) {
    this.service.login(username, password).subscribe((resp: any) => {
      this.refresh();
    });
  }

  logout() {
    this.service.logout().subscribe((resp: any) => {
      this.loggedin = false;
      this.user = null;
    });
  }

  isLoggedIn() {
    return this.loggedin;
  }
}
