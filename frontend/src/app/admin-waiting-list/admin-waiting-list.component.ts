import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { PhotoHelper } from '../photoHelper';

@Component({
  selector: 'app-admin-waiting-list',
  templateUrl: './admin-waiting-list.component.html',
  styleUrls: ['./admin-waiting-list.component.css']
})
export class AdminWaitingListComponent implements OnInit {

  constructor(private adminService: AdminService, public photoHelper: PhotoHelper) { }
  users = [];
  ngOnInit(): void {
    this.adminService.getWaitingUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
  }

  approveUser(username:string) {
    this.adminService.approveUser(username).subscribe((data: any) => {
    });
  }

  rejectUser(username:string) {
    this.adminService.rejectUser(username).subscribe((data: any) => {
    });
  }

  getTypeString(type) : string {
    switch (type) {
      case 'admin':
        return "Admin";
      case 'user':
        return "User";
      case 'org':
        return "Organizator";
    }
    return 'error'
  }

  getOrgString(org) : string {
    return `Organizacija: ${org.name}\n`
          +`Lokacija: ${org.street} ${org.streetNumber}, ${org.city}, ${org.country}\n`
          +`Poštanski broj: ${org.postNumber}\n`
          +`Matični broj organizacije: ${org.regNumber}`;
  }
}
