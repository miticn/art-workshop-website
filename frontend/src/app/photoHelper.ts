import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class PhotoHelper{
    url = "http://localhost:4000/uploads/";
    getWorkshopPhotoUrl(photoName: string){
        return this.url + '/workshopPictures/'+ photoName;
    }
    getProfilePhotoUrl(photoName: string){
        return this.url + '/profilePictures/' +photoName;
    }
}