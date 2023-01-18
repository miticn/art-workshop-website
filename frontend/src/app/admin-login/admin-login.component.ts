import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  msg: string = "";
  username: string = "";
  password: string = "";
  loggedin: boolean = false;
  LogIn(){}
  
}
