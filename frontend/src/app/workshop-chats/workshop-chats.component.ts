import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../helper';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { UsersService } from '../services/users.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-workshop-chats',
  templateUrl: './workshop-chats.component.html',
  styleUrls: ['./workshop-chats.component.css']
})
export class WorkshopChatsComponent implements OnInit {

  constructor(private workshopService : WorkshopsService, private activatedRoute: ActivatedRoute,
    private userService: UsersService, public helper:Helper) { }

  workshop: Workshop;
  workshopId: string;
  usersChatingIds: any[] = [];
  usersChating: User[] = [];
  ngOnInit(): void {
    this.workshopId = this.activatedRoute.snapshot.paramMap.get('id');
    this.workshopService.getById(this.workshopId).subscribe((data: Workshop) => {
      this.workshop = data;
      this.workshopService.getUsersChatingWithWorkshop(this.workshopId).subscribe((data: any) => {
        this.usersChatingIds = data;
        console.log(this.usersChatingIds);
        this.usersChatingIds.forEach((user) => {
          this.userService.getUserById(user).subscribe((data: any) => {
            this.usersChating.push(data);
            console.log(this.usersChating);
          });
        });
      });
    });
  }

  startChat(userId:string){
    const specs = 'width=500,height=500,top=100,left=100';
    window.open('/chat/'+this.workshopId+"/"+userId+"?hide=true", '_blank',specs);
  }

}
