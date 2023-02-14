import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workshop } from '../models/workshop';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';
import { Helper } from '../helper';
import { faHeart, faComment,faMessage } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
import { Comment } from '../models/comment';

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
    this.workshopService.getById(this.id).subscribe((data: any) => {
      console.log(data)
      this.workshop = data;
      this.images = [this.workshop.mainPicture, ...this.workshop.gallery];
      const location = new google.maps.LatLng(this.workshop.cordinates);
      this.geocoder.geocode({ location }).subscribe(data => {
        console.log(data)
        this.location = data.results[0].formatted_address;
      });
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
      });
    });
  }

}