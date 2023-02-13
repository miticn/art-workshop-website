import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Workshop } from '../models/workshop';
import { HttpClient } from '@angular/common/http';
import { MapGeocoder } from '@angular/google-maps';
import { ActivatedRoute } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';
import { Helper } from '../helper';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  workshop : Workshop = new Workshop();

  images = [];
  location : string;
  constructor(private geocoder: MapGeocoder, private activatedRoute : ActivatedRoute, private workshopService: WorkshopsService,
    public helper : Helper) { }

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
  }

}
