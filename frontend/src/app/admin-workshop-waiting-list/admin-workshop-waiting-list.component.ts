import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-workshop-waiting-list',
  templateUrl: './admin-workshop-waiting-list.component.html',
  styleUrls: ['./admin-workshop-waiting-list.component.css']
})
export class AdminWorkshopWaitingListComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  requestsFromOrgs : Workshop[] = [];
  requestsFromUsers : Workshop[] = [];
  ngOnInit(): void {
    this.adminService.getWorkshopRequestsOrg().subscribe((data: any) => {
      this.requestsFromOrgs = data;
      console.log(this.requestsFromOrgs);
    });
    this.adminService.getWorkshopRequestsUser().subscribe((data: any) => {
      this.requestsFromUsers = data;
      console.log(this.requestsFromUsers);
    });
  }

}
