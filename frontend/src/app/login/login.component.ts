import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PhotoHelper } from '../photoHelper';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private service: UsersService, private router: Router, public photoHelper: PhotoHelper) { }
  

  ngOnInit(): void {
    this.auth.refresh();
  }

  username: string = "";
  password: string = "";
  msg: string = "";
  LogIn(){
    if(this.username == "" || this.password == ""){
      this.msg = 'Sva polja moraju biti popunjena';
      return;
    }
    let username = this.username;
    let password = this.password;
    this.username = "";
    this.password = "";
    this.auth.login(username, password)
  }

  LogOut(){
    this.auth.logout();
  }

}
