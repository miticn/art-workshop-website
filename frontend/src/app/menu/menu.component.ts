import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private userService: UsersService, public auth : AuthService) { }
  myUser:User;
  ngOnInit(): void {
    this.userService.getSessionUser().subscribe((data: any) => {
      this.myUser = data;
    });
  }

}
