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
  workshopFormUpdate = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
    description: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
    descriptionLong: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]),
    date: new FormControl('', [Validators.required]),
    availableSeats: new FormControl(0, [Validators.required, Validators.min(1)]),
    location: new FormControl('', [Validators.required]),
    lat: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
    lng: new FormControl(null, [Validators.required, Validators.min(-180), Validators.max(180)]),
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

  mainPicturep: string;

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
      this.workshopFormUpdate.controls['name'].setValue(this.workshop.name);
      this.workshopFormUpdate.controls['description'].setValue(this.workshop.description);
      this.workshopFormUpdate.controls['descriptionLong'].setValue(this.workshop.descriptionLong);
      let selectedDate = new Date(this.workshop.date);
      this.workshopFormUpdate.controls['date'].setValue(selectedDate.toISOString().slice(0, 16));
      this.workshopFormUpdate.controls['availableSeats'].setValue(this.workshop.totalSeats);
      this.workshopFormUpdate.controls['location'].setValue(this.workshop.location);
      this.LocElem.nativeElement.value = this.workshop.location;
      this.workshopFormUpdate.controls['lat'].setValue(this.workshop.cordinates.lat);
      this.workshopFormUpdate.controls['lng'].setValue(this.workshop.cordinates.lng);
      this.workshopFormUpdate.controls['mainPictureServer'].setValue(this.workshop.mainPicture);
      this.workshopFormUpdate.controls['galleryServer'].setValue(this.workshop.gallery);
      this.workshopFormUpdate.controls['galleryLength'].setValue(this.workshop.gallery.length);

    });
  }

  location: Address;

  handleAddressChange(address: Address) {
    if(address.name!="" && address.hasOwnProperty('formatted_address') && address.hasOwnProperty('geometry')){
      this.workshopFormUpdate.controls['location'].setValue(address.formatted_address);
    
      this.workshopFormUpdate.controls['lat'].setValue(address.geometry.location.lat());
      this.workshopFormUpdate.controls['lng'].setValue(address.geometry.location.lng());
    }
    else{
      this.workshopFormUpdate.controls['location'].setValue("");
      this.workshopFormUpdate.controls['lat'].setValue(null);
      this.workshopFormUpdate.controls['lng'].setValue(null);
    }
  }

  onFileChangeMain(event) {
    if (event.target.files.length == 0){
      this.mainPicturep = '';
    }
    else if(!event.target.files[0].name.match("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")){
      this.mainPicturep = '';
      this.workshopFormUpdate.controls.mainPictureFile.setErrors({badfile: true});
    }
    else {

      const file = event.target.files[0];
      this.workshopFormUpdate.patchValue({
        mainPictureFile: file
      });
      
      this.workshopService.uploadMainPicture(this.workshopFormUpdate.get('mainPictureFile').value).subscribe((data: any) => {
        
        if(data.body)
          this.workshopFormUpdate.controls.mainPictureServer.setValue(data.body.mainPicture);
      });
    }
  }

  onFileChangeGallery(event) {
    this.workshopFormUpdate.controls.galleryLength.setValue(event.target.files.length+this.workshopFormUpdate.controls.galleryServer.value.length);
    console.log(this.workshopFormUpdate.controls.galleryLength.value)
    this.workshopFormUpdate.controls.gallery.reset();
    for (let i = 0; i < event.target.files.length; i++) {
      if(!event.target.files[i].name.match("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")){
        this.workshopFormUpdate.controls.gallery.setErrors({badfile: true});
        return;
      }
    }
    if (event.target.files.length == 0){
      this.workshopFormUpdate.controls.gallery.setValue(null);
    }
    else if (this.workshopFormUpdate.controls.galleryLength.value >0 && this.workshopFormUpdate.controls.galleryLength.value <=5 && this.workshopFormUpdate.controls.gallery.valid) {
      //upload all files
      const files = event.target.files;
      console.log(files)
      this.workshopFormUpdate.patchValue({
        galleryFiles: files
      });
      
      this.workshopService.uploadGallery(files).subscribe((data : any) => {
        if(data.body){
          this.workshopFormUpdate.controls.galleryServer.setValue(
            this.workshopFormUpdate.controls.galleryServer.value.concat(data.body)
          );
          console.log(this.workshopFormUpdate.controls.galleryServer.value)
        }
        
      });
      
    }
  }

  updateWorkshop(){
    this.workshopService.updateWorkshop(this.workshopFormUpdate.value,this.workshop._id).subscribe((data : any) => {
        this.router.navigate(['/workshop/'+this.workshop._id]);
      }
    );
  }

  removeGalleryImage(image: string){
    this.workshopFormUpdate.controls.galleryServer.setValue(this.workshopFormUpdate.controls.galleryServer.value.filter((el: string) => el !== image));
    this.workshopFormUpdate.controls.galleryLength.setValue(this.workshopFormUpdate.controls.galleryLength.value - 1);

    console.log(this.workshopFormUpdate.controls)
  }

}
