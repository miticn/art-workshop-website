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

  constructor(private servis: UsersService, private ruter: Router) { }

  ngOnInit(): void {
  }


  username: string = "";
  password: string = "";
  msg: string = "";

  LogIn(){
    this.servis.prijavaNaSistem(this.username, this.password).subscribe((user: User)=>{
      if(!user){
        this.msg = 'Bad credentials';
      }
      else{
        if(user.type == 'user'){
          this.ruter.navigate(['/user']);
        }
        else if(user.type == 'org'){
          this.ruter.navigate(['/org']);
        }
      }
    })
  }

}
