import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let PhotoHelper = class PhotoHelper {
    constructor() {
        this.url = "http://localhost:4000/uploads/";
    }
    getWorkshopPhotoUrl(photoName) {
        return this.url + '/workshopPictures/' + photoName;
    }
    getProfilePhotoUrl(photoName) {
        return this.url + '/profilePictures/' + photoName;
    }
};
PhotoHelper = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PhotoHelper);
export { PhotoHelper };
//# sourceMappingURL=photoHelper.js.map