import { Component, OnInit } from '@angular/core';
import { Helper } from '../helper';
import { Workshop } from '../models/workshop';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-workshop-waiting-list',
  templateUrl: './admin-workshop-waiting-list.component.html',
  styleUrls: ['./admin-workshop-waiting-list.component.css']
})
export class AdminWorkshopWaitingListComponent implements OnInit {

  constructor(private adminService:AdminService, public helper:Helper) { }

  requestsFromOrgs : any[] = [];
  requestsFromUsers : any[] = [];
  ngOnInit(): void {
    this.adminService.getWorkshopRequestsOrg().subscribe((data: any) => {
      this.requestsFromOrgs = data;
    });
    this.adminService.getWorkshopRequestsUser().subscribe((data: any) => {
      this.requestsFromUsers = data;
      console.log(this.requestsFromUsers);
    });
  }

  approveWorkshop(workshopId: string) {
    this.adminService.approveWorkshop(workshopId).subscribe((data: any) => {
      console.log(data);
      this.adminService.getWorkshopRequestsOrg().subscribe((data: any) => {
        this.requestsFromOrgs = data;
      });

    });
  }

  /*approveWorkshopUser(workshopId: string) {
  }*/

}
