import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Workshop } from '../models/workshop';

@Component({
  selector: 'app-create-workshop',
  templateUrl: './create-workshop.component.html',
  styleUrls: ['./create-workshop.component.css']
})
export class CreateWorkshopComponent implements OnInit {

  constructor() { }
  minDateTime: string;
  ngOnInit(): void {
    //set minDateTime to 24 hours from now rounded to the nearest minute for the date picker
    let now = new Date();
    now.setHours(now.getHours() + 24);
    this.minDateTime = now.toISOString().slice(0, 16).replace('T', ' '); 
    console.log(this.minDateTime)
  }
  workshop : Workshop = new Workshop();

  location: Address;

  handleAddressChange(address: Address) {
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
  }
}
