import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { PhotoHelper } from '../photoHelper';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UsersService, private router: Router, public photoHepler: PhotoHelper) { }
  refresh(): void {
    this.service.getSessionUser().subscribe((resp: any) => {
      if(resp['error']){
        this.loggedin = false;
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

  ngOnInit(): void {
    this.refresh();
  }

  user: User = null;
  username: string = "";
  password: string = "";
  msg: string = "";
  loggedin: boolean = false;
  LogIn(){
    if(this.username == "" || this.password == ""){
      this.msg = 'Sva polja moraju biti popunjena';
      return;
    }
    this.service.login(this.username, this.password).subscribe((resp: any) => {
      this.refresh();
    });
  }

  LogOut(){
    this.service.logout().subscribe((resp: any) => {
      this.loggedin = false;
    });
  }

}
