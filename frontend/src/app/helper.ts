import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Helper{
    url = "http://localhost:4000/uploads/";
    getWorkshopPhotoUrl(photoName: string){
        return this.url + '/workshopPictures/'+ photoName;
    }
    getProfilePhotoUrl(photoName: string){
        return this.url + '/profilePictures/' +photoName;
    }

    getTypeString(type) : string {
        switch (type) {
          case 'admin':
            return "Admin";
          case 'user':
            return "Korisnik";
          case 'org':
            return "Organizator";
        }
        return 'error'
      }
    
      getOrgString(org) : string {
        return `Organizacija: ${org.name}\n`
              +`Lokacija: ${org.street} ${org.streetNumber}, ${org.city}, ${org.country}\n`
              +`Poštanski broj: ${org.postNumber}\n`
              +`Matični broj organizacije: ${org.regNumber}`;
      }

      getVerifyString(verify) : string {
        switch (verify) {
          case 'waiting':
            return "Na čekanju";
          case 'approved':
            return "Verifikovan";
          case 'rejected':
            return "Odbijen";
        }
        return 'error'
      }
}