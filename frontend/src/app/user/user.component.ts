import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { Helper } from '../helper';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, private userService : UsersService, public helper: Helper, public auth: AuthService) { }
  username: string;
  user: User;
  exists: boolean = true;
  userString: string;
  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUser(this.username).subscribe((data: User) => {
      if(data['error'] == "no user"){
        this.exists = false;
      }
      else{
        this.user = data;
        this.userString = JSON.stringify(this.user);
      }
      
    });
  }

}
