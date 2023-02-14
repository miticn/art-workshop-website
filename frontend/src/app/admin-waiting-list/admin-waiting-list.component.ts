import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Helper } from '../helper';

@Component({
  selector: 'app-admin-waiting-list',
  templateUrl: './admin-waiting-list.component.html',
  styleUrls: ['./admin-waiting-list.component.css']
})
export class AdminWaitingListComponent implements OnInit {

  constructor(private adminService: AdminService, public photoHelper: Helper) { }
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
}
