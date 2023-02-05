import { __decorate } from "tslib";
import { Component } from '@angular/core';
let WorkshopsComponent = class WorkshopsComponent {
    constructor(workshopService, photoHepler) {
        this.workshopService = workshopService;
        this.photoHepler = photoHepler;
        this.workshops = [];
    }
    ngOnInit() {
        this.workshopService.getAll().subscribe((data) => {
            this.workshops = data;
            console.log(this.workshops);
        });
    }
    sortWorkshopsByDate() {
        this.workshops.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }
    sortWorkshopsByName() {
        this.workshops.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }
    search() {
    }
};
WorkshopsComponent = __decorate([
    Component({
        selector: 'app-workshops',
        templateUrl: './workshops.component.html',
        styleUrls: ['./workshops.component.css']
    })
], WorkshopsComponent);
export { WorkshopsComponent };
//# sourceMappingURL=workshops.component.js.map