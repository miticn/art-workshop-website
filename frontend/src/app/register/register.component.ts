import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  username:string;
  firstname:string;
  lastname:string;
  email:string;
  password:string;
  confirmPassword:string;
  phone:string;
  message:string;
  organizer:string;

  organizationName:string;
  city:string;
  country:string;
  postNumber:string;
  street:string;
  streetNumber:string;
  matNumber:string;
  register(){};

}
