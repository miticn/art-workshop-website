import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-create-workshop',
  templateUrl: './create-workshop.component.html',
  styleUrls: ['./create-workshop.component.css']
})
export class CreateWorkshopComponent implements OnInit {
  workshopForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
    descriptionLong: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]),
    date: new FormControl('', [Validators.required]),
    availableSeats: new FormControl('', [Validators.required, Validators.min(1)]),
    location: new FormControl('', [Validators.required]),
    lat: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
    lng: new FormControl(null, [Validators.required, Validators.min(-180), Validators.max(180)]),
    mainPicture: new FormControl('', [Validators.required, Validators.pattern("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")]),
    mainPictureFile: new FormControl(null, []),
    gallery: new FormControl('', []),
  });

  constructor(private workshopService: WorkshopsService) { }
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
    if(address.name!="" && address.hasOwnProperty('formatted_address') && address.hasOwnProperty('geometry')){
      this.workshopForm.controls['location'].setValue(address.formatted_address);
    
      this.workshopForm.controls['lat'].setValue(address.geometry.location.lat());
      this.workshopForm.controls['lng'].setValue(address.geometry.location.lng());
    }
    else{
      this.workshopForm.controls['location'].setValue("");
      this.workshopForm.controls['lat'].setValue(null);
      this.workshopForm.controls['lng'].setValue(null);
    }
  }

  createWorkshop(){
    this.workshopService.createWorkshop(this.workshopForm.value,"test").subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
