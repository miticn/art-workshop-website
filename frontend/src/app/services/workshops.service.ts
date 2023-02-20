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

  getMessages(workshopId: string, userId: string){
    let body = {
      id: workshopId,
      userId : userId
    }
    return this.http.post(`${this.uri}/getMessages`, body,{withCredentials: true});
  }

  sendMessage(workshopId: string, message: string, to: string){
    let body = {
      id: workshopId,
      text: message,
      to: to
    }
    return this.http.post(`${this.uri}/sendMessage`, body,{withCredentials: true});
  }

  getWorkshopJSON(workshopId: string){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/getWorkshopJSON`, body,{withCredentials: true});
  }

  createWorkshop(workshopForm, mainPicture){
    const formData = new FormData();
    formData.set('name', workshopForm.name);
    formData.set('location', workshopForm.location);
    formData.set('description', workshopForm.description);
    formData.set('date', workshopForm.date);
    formData.set('totalSeats', workshopForm.availableSeats);
    formData.set('descriptionLong', workshopForm.descriptionLong);
    formData.set('lat', workshopForm.lat)
    formData.set('lng', workshopForm.lng)
    formData.set('gallery', JSON.stringify(workshopForm.galleryServer))
    //if(profilePicture != null) 
    //  formData.append('file', profilePicture, profilePicture.name);
    if(mainPicture != null)
      formData.append('mainPicture', mainPicture, mainPicture.name);

    return this.http.post(`${this.uri}/createWorkshop`, formData,{
      reportProgress: true,
      observe: 'events',
      withCredentials: true});
  }

  uploadGallery(galleryPictures){
    const formData = new FormData();
    for(let i = 0; i < galleryPictures.length; i++){
      formData.append('galleryPictures', galleryPictures[i], galleryPictures[i].name);
    }
    return this.http.post(`${this.uri}/uploadGallery`, formData,{
      reportProgress: true,
      observe: 'events',
      withCredentials: true});
  }

  uploadMainPicture(mainPicture){
    const formData = new FormData();
    formData.append('mainPicture', mainPicture, mainPicture.name);
    return this.http.post(`${this.uri}/uploadMainPicture`, formData,{
      reportProgress: true,
      observe: 'events',
      withCredentials: true});
  }

  updateWorkshop(workshopForm, id){
    let body = {
      id: id,
      name: workshopForm.name,
      location: workshopForm.location,
      description: workshopForm.description,
      date: workshopForm.date,
      totalSeats: workshopForm.availableSeats,
      descriptionLong: workshopForm.descriptionLong,
      lat: workshopForm.lat,
      lng: workshopForm.lng,
      mainPicture: workshopForm.mainPictureServer,
      gallery: JSON.stringify(workshopForm.galleryServer)
    }
    console.log(body);
    return this.http.post(`${this.uri}/updateWorkshop`, body,{withCredentials: true});
  }


  getWorkshopsByOwner(id){
    let body = {
      id: id
    }
    return this.http.post(`${this.uri}/getWorkshopsByOwner`,body , {withCredentials: true});
  }

  getUsersChatingWithWorkshop(workshopId){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/getUsersChatingWithWorkshop`, body,{withCredentials: true});
  }

  createWorkshopJSON(workshopJSON){
    let body = {
      json: workshopJSON
    }
    return this.http.post(`${this.uri}/createWorkshopJSON`, body,{withCredentials: true});
  }

  getApplications(workshopId){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/getApplications`, body,{withCredentials: true});
  }

  approveApplication(applicationId){
    let body = {
      id: applicationId
    }
    console.log(body)
    return this.http.post(`${this.uri}/approveApplication`, body,{withCredentials: true});
  }

  cancelWorkshop(workshopId){
    let body = {
      id: workshopId
    }
    return this.http.post(`${this.uri}/cancelWorkshop`, body,{withCredentials: true});
  }
  
  
}
