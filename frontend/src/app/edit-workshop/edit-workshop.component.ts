import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Helper } from '../helper';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../services/workshops.service';

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit {
  workshopForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
    descriptionLong: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]),
    date: new FormControl('', [Validators.required]),
    availableSeats: new FormControl(0, [Validators.required, Validators.min(1)]),
    location: new FormControl('', [Validators.required]),
    lat: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
    lng: new FormControl(null, [Validators.required, Validators.min(-180), Validators.max(180)]),
    mainPicture: new FormControl('', [Validators.pattern("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")]),
    mainPictureFile: new FormControl(null, []),
    mainPictureServer: new FormControl('', []),
    gallery: new FormControl(null, []),
    galleryFiles: new FormControl([], []),
    galleryLength: new FormControl(0, [Validators.min(0), Validators.max(5)]),
    galleryServer: new FormControl([], [])
  });

  constructor(private workshopService: WorkshopsService, private router: Router,
    private activatedRoute : ActivatedRoute, public helper: Helper) { }
  minDateTime: string;
  workshop : Workshop = new Workshop();
  workshopId: string;

  @ViewChild('location') LocElem: ElementRef;

  ngOnInit(): void {
    //set minDateTime to 24 hours from now rounded to the nearest minute for the date picker
    let now = new Date();
    now.setHours(now.getHours() + 24);
    this.minDateTime = now.toISOString().slice(0, 16).replace('T', ' '); 
    console.log(this.minDateTime)

    
    this.workshopId = this.activatedRoute.snapshot.paramMap.get('id');
    this.workshopService.getById(this.workshopId).subscribe((data: any) => {
      this.workshop = data;
      this.workshopForm.controls['name'].setValue(this.workshop.name);
      this.workshopForm.controls['description'].setValue(this.workshop.description);
      this.workshopForm.controls['descriptionLong'].setValue(this.workshop.descriptionLong);
      //this.workshopForm.controls['date'].setValue(this.workshop.date.toISOString().slice(0, 16).replace('T', ' '));
      this.workshopForm.controls['availableSeats'].setValue(this.workshop.totalSeats);
      this.workshopForm.controls['location'].setValue(this.workshop.location);
      this.LocElem.nativeElement.value = this.workshop.location;
      this.workshopForm.controls['lat'].setValue(this.workshop.cordinates.lat);
      this.workshopForm.controls['lng'].setValue(this.workshop.cordinates.lng);
      this.workshopForm.controls['mainPictureServer'].setValue(this.workshop.mainPicture);
      this.workshopForm.controls['galleryServer'].setValue(this.workshop.gallery);
      //this.workshopForm.controls['galleryLength'].setValue(this.workshop.gallery.length);

    });
  }

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

  removeGalleryImage(image: string){
    this.workshopForm.controls.galleryServer.setValue(this.workshopForm.controls.galleryServer.value.filter((el: string) => el !== image));
  }

}
