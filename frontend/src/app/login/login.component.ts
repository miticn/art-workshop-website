import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UsersService, private router: Router) { }
  refresh(): void {
    this.service.getSessionUser().subscribe((resp: any) => {
      console.log(resp);
      if(resp['error']){
        this.loggedin = false;
      }
      else{
        this.user = resp.user;
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
