import { Component, OnInit } from '@angular/core';
import { Helper } from '../helper';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  allUsers:User[] = [];
  constructor(public helper:Helper, private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data: any) => {
      this.allUsers = data;
      //remove rejected users
      this.allUsers = this.allUsers.filter((user) => {
        return user.verified != "rejected"
      });
      //remove admins
      this.allUsers = this.allUsers.filter((user) => {
        return user.type != "admin"
      });
    }); 
  }

  rejectUser(username:string) {
    this.adminService.rejectUser(username).subscribe((data: any) => {
      this.adminService.getAllUsers().subscribe((data: any) => {
        this.allUsers = data;
        //remove rejected users
        this.allUsers = this.allUsers.filter((user) => {
          return user.verified != "rejected"
        });
        //remove admins
        this.allUsers = this.allUsers.filter((user) => {
          return user.type != "admin"
        });
      });
    });
  }

}
