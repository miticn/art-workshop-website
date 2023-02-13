import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop } from '../models/workshop';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  uri = 'http://localhost:4000/workshops';
  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }


  getById(id: string){
    let body = {
      id: id
    }
    return this.http.post(`${this.uri}/getById`, body);
  }

  getWorkshopComments(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/getWorkshopComments`, body);
  }
}
