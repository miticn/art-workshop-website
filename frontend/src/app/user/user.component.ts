import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { Helper } from '../helper';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { faHeartBroken, faClose, faPencil } from '@fortawesome/free-solid-svg-icons';
import { WorkshopsService } from '../services/workshops.service';
import { Workshop } from '../models/workshop';

import { Comment } from '../models/comment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  faHeartBroken = faHeartBroken;
  faClose = faClose;
  faPencil = faPencil;

  constructor(private activatedRoute : ActivatedRoute, private userService : UsersService, public helper: Helper, public auth: AuthService,
    private workshopService: WorkshopsService, private router : Router) { }
  username: string;
  user: User;
  exists: boolean = true;
  userString: string;

  chatWorkshopIds: string[] = [];
  chatWorkshops: Workshop[] = [];
  
  attendedWorkshops: Workshop[] = [];
  myWorkshops: Workshop[] = [];
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
        this.workshopService.getWorkshopsUserAttended(this.user._id).subscribe((data: any) => {
          this.attendedWorkshops = data;
          console.log(this.workshops)
        });
        this.workshopService.getAllUsersChats(this.user._id).subscribe((data: any) => {
          this.chatWorkshopIds = data;
          this.chatWorkshopIds.forEach((id) => {
            this.workshopService.getById(id).subscribe((data: any) => {
              this.chatWorkshops.push(data);
            });
          });

        });
      }
      if(this.user.type == "org")
        this.workshopService.getWorkshopsByOwner(this.user._id).subscribe((data: Workshop[]) => {
          this.myWorkshops = data;
          //remove cancelled workshops
          this.myWorkshops = this.myWorkshops.filter(w => w.status != "cancelled");
        });
      
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

  deleteComment(commentId){
    this.workshopService.deleteComment(commentId).subscribe((data: any) => {
      this.userService.getMyComments().subscribe((data: any) => {
        this.myComments = data;
      });
    });
  }

  updateComment(commentId, text){
    this.workshopService.updateComment(commentId, text).subscribe((data: any) => {
      this.userService.getMyComments().subscribe((data: any) => {
        this.myComments = data;
        this.toggleEditingComment(commentId)
      });
    });
  }

  editingComments: string[] = [];

  toggleEditingComment(commentId: string) {
    const index = this.editingComments.indexOf(commentId);
    if (index > -1) {
      this.editingComments.splice(index, 1);
    } else {
      this.editingComments.push(commentId);
    }
  }

  createWorkshopJSON(){
    //open file picker
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    console.log(input)
    input.click();
    input.onchange = e => {
      //get file
      var file = e.target['files'][0];
      //read file
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = readerEvent => {
        var content = readerEvent.target['result'];
        console.log(content)
        //send file
        this.workshopService.createWorkshopJSON(content).subscribe((data: any) => {
          let ws : Workshop = data;
          this.router.navigate(['/workshop', ws._id,'edit']);
        });
      }
    }
  }

  cancelWorkshop(workshopId){
    this.workshopService.cancelWorkshop(workshopId).subscribe((data: any) => {
      this.workshopService.getWorkshopsByOwner(this.user._id).subscribe((data: Workshop[]) => {
        this.myWorkshops = data;
        
        this.myWorkshops = this.myWorkshops.filter(w => w.status != "cancelled");
      });
    });
  }
}
