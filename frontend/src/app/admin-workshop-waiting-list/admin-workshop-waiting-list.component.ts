import { Component, OnInit } from '@angular/core';
import { Helper } from '../helper';
import { Workshop } from '../models/workshop';
import { AdminService } from '../services/admin.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-admin-workshop-waiting-list',
  templateUrl: './admin-workshop-waiting-list.component.html',
  styleUrls: ['./admin-workshop-waiting-list.component.css']
})
export class AdminWorkshopWaitingListComponent implements OnInit {

  constructor(private adminService:AdminService, public helper:Helper,
    private workshopService: WorkshopsService) { }

  requestsFromOrgs : any[] = [];
  requestsFromUsers : any[] = [];
  
  ngOnInit(): void {
    this.adminService.getWorkshopRequestsOrg().subscribe((data: any) => {
      this.requestsFromOrgs = data;
    });
    this.adminService.getWorkshopRequestsUser().subscribe((data: any) => {
      this.requestsFromUsers = data;
      console.log(this.requestsFromUsers);
      //get getWorkshopsUserSignedUp for each user
      for(let i = 0; i < this.requestsFromUsers.length; i++){
        this.workshopService.getWorkshopsUserSignedUp(this.requestsFromUsers[i].owner._id).subscribe((data: any) => {
          this.requestsFromUsers[i].owner.canBecomeOrg = data.length == 0;
          console.log(this.requestsFromUsers[i].owner.canBecomeOrg);
        });
      }
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

  approveWorkshopUser(workshop) {
    this.adminService.setUserToOrg(workshop.owner._id).subscribe((data: any) => {
    });

    this.adminService.approveWorkshop(workshop._id).subscribe((data: any) => {
      console.log(data);
      this.adminService.getWorkshopRequestsOrg().subscribe((data: any) => {
        this.requestsFromOrgs = data;
      });

    });
  }

}
