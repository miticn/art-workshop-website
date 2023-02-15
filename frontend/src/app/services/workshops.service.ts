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

  comment(workshopId: string, comment: string){
    let body = {
      id: workshopId,
      text: comment
    }
    return this.http.post(`${this.uri}/comment`, body,{withCredentials: true});
  }

  like(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/like`, body,{withCredentials: true});
  }

  isLiked(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/isLiked`, body,{withCredentials: true});
  }

  deleteComment(commentId: string){
    let body = {
      commentId: commentId
    }
    return this.http.post(`${this.uri}/deleteComment`, body,{withCredentials: true});
  }

  updateComment(commentId: string, text: string){
    let body = {
      commentId: commentId,
      text: text
    }
    return this.http.post(`${this.uri}/updateComment`, body,{withCredentials: true});
  }

  attend(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/attend`, body,{withCredentials: true});
  }

  attendingStatus(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/attendingStatus`, body,{withCredentials: true});
  }

  cancelSeat(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/cancelSeat`, body,{withCredentials: true});
  }

  reserveSeat(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/reserveSeat`, body,{withCredentials: true});
  }

  alertMe(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/alertMe`, body,{withCredentials: true});
  }
}
