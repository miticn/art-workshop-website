import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-waiting-list',
  templateUrl: './admin-waiting-list.component.html',
  styleUrls: ['./admin-waiting-list.component.css']
})
export class AdminWaitingListComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  users = [];
  ngOnInit(): void {
    this.adminService.getWaitingUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
  }

}
