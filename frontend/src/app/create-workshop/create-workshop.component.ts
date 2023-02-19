import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    gallery: new FormControl(null, []),
    galleryFiles: new FormControl([], []),
    galleryLength: new FormControl(0, [Validators.min(0), Validators.max(5)]),
    galleryFileTypesOK: new FormControl(true, []),
    galleryServer: new FormControl([], [])
  });

  constructor(private workshopService: WorkshopsService, private router: Router) { }
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

  onFileChangeMain(event) {
    if (event.target.files.length == 0){
      this.workshopForm.controls.mainPicture.setValue(null);
    }
    else if(this.workshopForm.controls.mainPicture.valid) {
      const file = event.target.files[0];
      this.workshopForm.patchValue({
        mainPictureFile: file
      });
      
    }
  }

  onFileChangeGallery(event) {
    this.workshopForm.controls.galleryLength.setValue(event.target.files.length);
    console.log(this.workshopForm.controls.galleryLength.value)
    this.workshopForm.controls.gallery.reset();
    for (let i = 0; i < event.target.files.length; i++) {
      if(!event.target.files[i].name.match("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")){
        this.workshopForm.controls.gallery.setErrors({badfile: true});
        return;
      }
    }
    if (event.target.files.length == 0){
      this.workshopForm.controls.mainPicture.setValue(null);
    }
    else if (event.target.files.length >0 && event.target.files.length <5 && this.workshopForm.controls.gallery.valid) {
      //upload all files
      const files = event.target.files;
      console.log(files)
      this.workshopForm.patchValue({
        galleryFiles: files
      });
      
      this.workshopService.uploadGallery(files).subscribe((data : any) => {
        if(data.body){
          this.workshopForm.controls.galleryServer.setValue(data.body);
          console.log(this.workshopForm.controls.galleryServer.value)
        }
        
      });
      
    }
  }

  createWorkshop(){
    this.workshopService.createWorkshop(this.workshopForm.value,this.workshopForm.get('mainPictureFile').value).subscribe((data : any) => {
        console.log(data);
        if(data.body){
          this.router.navigate(['/workshop/'+data.body._id]);
        }
      }
    );
  }
}
