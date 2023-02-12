import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  workshop : Workshop = {
    name: "Photography Workshop",
    location: "New York City",
    description: "A two-day workshop for photography enthusiasts",
    date: new Date("2023-05-06"),
    mainPicture: "https://picsum.photos/id/237/400/300",
    gallery: [
        "https://picsum.photos/id/238/400/300",
        "https://picsum.photos/id/239/400/300",
        "https://picsum.photos/id/240/400/300",
        "https://picsum.photos/id/241/400/300",
        "https://picsum.photos/id/242/400/300"
    ],
    availableSeats: 15,
    descriptionLong: "This workshop is designed for photography enthusiasts looking to improve their skills and take their work to the next level. Over the course of two days, participants will learn about composition, lighting, and post-processing techniques. The workshop will include hands-on practice and a review of each participant's work.",
  }

  images = [this.workshop.mainPicture, ...this.workshop.gallery];
  constructor() { }

  ngOnInit(): void {
  }

}
