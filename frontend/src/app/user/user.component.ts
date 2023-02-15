import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { Helper } from '../helper';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { WorkshopsService } from '../services/workshops.service';
import { Workshop } from '../models/workshop';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  faHeartBroken = faHeartBroken;
  faHeart = faHeart;

  constructor(private activatedRoute : ActivatedRoute, private userService : UsersService, public helper: Helper, public auth: AuthService,
    private workshopService: WorkshopsService) { }
  username: string;
  user: User;
  exists: boolean = true;
  userString: string;
    
  workshops : Workshop[] = [];
  myLikes: any[] = [];
  myComments: Comment[] = [];
  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUser(this.username).subscribe((data: User) => {
      if(data['error'] == "no user"){
        this.exists = false;
      }
      else{
        this.user = data;
        this.userString = JSON.stringify(this.user);
      }
      
    });
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshops = data;
      console.log(this.workshops);
    });
    this.userService.getMyLikes().subscribe((data: any) => {
      this.myLikes = data;
      console.log(this.myLikes)
  
    });
    this.userService.getMyComments().subscribe((data: any) => {
      this.myComments = data;
      console.log(this.myComments)
    });
  }

  getWorkshopFromId(id: string) {
    return this.workshops.find(workshop => workshop._id === id);
  }

  unlike(workshopId){
    this.workshopService.like(workshopId).subscribe((data: any) => {
      this.userService.getMyLikes().subscribe((data: any) => {
      this.myLikes = data;
    
      });
    });
  }
}
