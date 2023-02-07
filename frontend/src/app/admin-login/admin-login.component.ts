import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private service: UsersService, private router: Router) { }

  ngOnInit(): void {
  }
  msg: string = "";
  username: string = "";
  password: string = "";
  loggedin: boolean = false;
  LogIn(){
    this.service.loginAdmin(this.username, this.password).subscribe((res: any) => {
      alert(res.msg);
      location.reload();
    });
  }
  
}
