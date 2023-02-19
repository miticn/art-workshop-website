import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../models/message';
import { User } from '../models/user';
import { Workshop } from '../models/workshop';
import { UsersService } from '../services/users.service';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private workshopService: WorkshopsService, private activatedRoute : ActivatedRoute,
    private userService: UsersService) { }
  workshopId: string;
  msgs : Message[] = [];
  workshop: Workshop;
  users = {};
  msgText: string;
  me: User;

  intervalId: any;
  ngOnInit(): void {
    this.workshopId = this.activatedRoute.snapshot.paramMap.get('workshopId');

    this.userService.getSessionUser().subscribe((res: any) => {
      this.me = res;
      console.log(this.me);
    });
    this.workshopService.getMessages(this.workshopId).subscribe((res: any) => {
      this.msgs = res;
      //sort messages by date
      this.msgs.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      //get users for each message
      this.msgs.forEach((msg) => {
        if (!this.users[msg.from]){
          this.userService.getUserById(msg.from).subscribe((res: any) => {
            this.users[msg.from] = res;
          });
        }
        if (!this.users[msg.to]) {
          this.userService.getUserById(msg.to).subscribe((res: any) => {
            this.users[msg.to] = res;
          });
        }
      });
    });

    this.workshopService.getById(this.workshopId).subscribe((data: any) => {
      this.workshop = data;
    });

    this.intervalId = setInterval(() => {
      this.workshopService.getMessages(this.workshopId).subscribe((res: any) => {
        this.msgs = res;
        //sort messages by date
        this.msgs.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      });
    }, 3000);
  }

  getUser(userId){
    if(this.users[userId]){
      return this.users[userId]
    }
    return {
      name: 'Loading...',
      profilePicture: 'default.png'
    };
  }
  sendMsg(){
    if(this.msgText){
      this.workshopService.sendMessage(this.workshopId, this.msgText, this.workshop.owner).subscribe((res: any) => {
        this.msgs.push(res);
        this.msgText = '';
      });
    }
  }

}
