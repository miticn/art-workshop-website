import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let WorkshopsService = class WorkshopsService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000/workshops';
    }
    getAll() {
        return this.http.get(`${this.uri}/getAll`);
    }
};
WorkshopsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WorkshopsService);
export { WorkshopsService };
//# sourceMappingURL=workshops.service.js.map