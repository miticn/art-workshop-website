import { Component, OnInit } from '@angular/core';
import { Helper } from '../helper';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { AdminService } from '../services/admin.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  allUsers:User[] = [];
  allWorkshops:Workshop[] = [];
  constructor(public helper:Helper, private adminService:AdminService,
    private workshopService:WorkshopsService) { }

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
    this.adminService.getAllWorkshops().subscribe((data: any) => {
      this.allWorkshops=data;
      
      this.allWorkshops = this.allWorkshops.filter(w => w.status != "cancelled");
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

  cancelWorkshop(workshopId){
    this.workshopService.cancelWorkshop(workshopId).subscribe((data: any) => {
      this.adminService.getAllWorkshops().subscribe((data: Workshop[]) => {
        this.allWorkshops = data;
        
        this.allWorkshops = this.allWorkshops.filter(w => w.status != "cancelled");
      });
    });
  }

}
