import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../helper';
import { UsersService } from '../services/users.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-workshop-applied',
  templateUrl: './workshop-applied.component.html',
  styleUrls: ['./workshop-applied.component.css']
})
export class WorkshopAppliedComponent implements OnInit {

  constructor(private workshopService : WorkshopsService, public helper:Helper,
    private activeRoute: ActivatedRoute, private userService: UsersService) { }

  users = [];
  workshopId = '';
  applications = [];
  ngOnInit(): void {
    //get id form active route
    this.workshopId = this.activeRoute.snapshot.paramMap.get('id');

    this.workshopService.getApplications(this.workshopId).subscribe((res:any)=>{
      this.applications = res;
      this.applications.forEach((application)=>{
        this.userService.getUserById(application.user).subscribe((res:any)=>{
          this.users.push(res);
        })
      })
    });
  }

  approveUser(userId: string){
    //find application
    let application = this.applications.find((application)=>{
      return application.user == userId;
    });
    console.log(application._id)
    this.workshopService.approveApplication(application._id).subscribe((res:any)=>{
      this.users = [];
      console.log(res);
      this.workshopService.getApplications(this.workshopId).subscribe((res:any)=>{
        this.applications = res;
        this.applications.forEach((application)=>{
          this.userService.getUserById(application.user).subscribe((res:any)=>{
            this.users.push(res);
          })
        })
      });
    })
  }

}
