import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workshop } from '../models/workshop';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';
import { Helper } from '../helper';
import { faHeart, faComment, faMessage } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
import { Comment } from '../models/comment';
import { User } from '../models/user';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  faHeart = faHeart;
  faComment = faComment;
  faOutbox = faMessage;
  workshop : Workshop = new Workshop();

  isDisabled : boolean = false;
  myUser: User;
  liked : boolean = true;

  attendingStatus : string;

  comments : Comment[] = [];
  users = {};
  getUser(userId){
    if(this.users[userId]){
      return this.users[userId]
    }
    return {
      name: 'Loading...',
      profilePicture: 'default.png'
    };
  }
  commentText : string;
  images = [];
  location : string;
  constructor(private geocoder: MapGeocoder, private activatedRoute : ActivatedRoute, private workshopService: WorkshopsService,
    public helper : Helper, private userService: UsersService) { }

  id: string;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.workshopService.attendingStatus(this.id).subscribe((data: any) => {
      this.attendingStatus = data.status;
    });
    this.workshopService.isLiked(this.id).subscribe((data: any) => {
      this.liked = data.liked;
    });
    this.workshopService.getById(this.id).subscribe((data: any) => {
      this.workshop = data;
      this.userService.getSessionUser().subscribe((data: any) => {
        this.myUser = data;
      });
      this.images = [this.workshop.mainPicture, ...this.workshop.gallery];
      const location = new google.maps.LatLng(this.workshop.cordinates);
      console.log("location")
      console.log(location)
      this.geocoder.geocode({ location }).subscribe(data => {
        console.log(data)
        this.location = data.results[0].formatted_address;
      });
      console.log((new Date(this.workshop.date).getTime() - new Date().getTime())/ (1000 * 60 * 60)) ;
      this.isDisabled = (new Date(this.workshop.date).getTime() - new Date().getTime())/ (1000 * 60 * 60) < 12;
    });

    this.workshopService.getWorkshopComments(this.id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments)
      this.comments.forEach(comment => {
        this.userService.getUserById(comment.user).subscribe((data: any) => {
          this.users[comment.user] = data;
        });
      });
    });
  }

  comment(){
    this.workshopService.comment(this.id, this.commentText).subscribe((data: any) => {
      this.commentText = '';
      this.workshopService.getWorkshopComments(this.id).subscribe((data: any) => {
        this.comments = data;
        this.comments.forEach(comment => {
          this.userService.getUserById(comment.user).subscribe((data: any) => {
            this.users[comment.user] = data;
          });
        });
      });
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    $element.focus();
  }

  like(){
    this.workshopService.like(this.id).subscribe((data: any) => {
      this.workshop.likes = data.likes;
      this.liked = !this.liked;
    });
  }

  reserveSeat(){
    this.workshopService.reserveSeat(this.id).subscribe((data: any) => {
      this.workshop = data;
      this.workshopService.attendingStatus(this.id).subscribe((data: any) => {
        this.attendingStatus = data.status;
      });
      this.isDisabled = (new Date(this.workshop.date).getTime() - new Date().getTime())/ (1000 * 60 * 60) < 12;
    });
  }

  cancelSeat(){
    this.workshopService.cancelSeat(this.id).subscribe((data: any) => {
      this.workshop = data;
      this.workshopService.attendingStatus(this.id).subscribe((data: any) => {
        this.attendingStatus = data.status;
      });
    });
  }

  alertMe(){
    this.workshopService.alertMe(this.id).subscribe((data: any) => {
      this.attendingStatus = data.status;
    });
  }

  startChat(){
    const specs = 'width=500,height=500,top=100,left=100';
    window.open('/chat/'+this.id+"/"+this.workshop.owner+"?hide=true", '_blank',specs);
  }

  saveJSON(){
    this.workshopService.getWorkshopJSON(this.id).subscribe((data: any) => {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data.json);
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "workshop-"+this.workshop._id+".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  }
}
