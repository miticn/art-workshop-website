import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uri = 'http://localhost:4000/admin';

  constructor(private http: HttpClient) { }

  approveUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/approveUser`, data, { withCredentials: true });
  }

  rejectUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/rejectUser`, data, { withCredentials: true });
  }

  getWaitingUsers() {
    return this.http.post(`${this.uri}/getWaitingUsers`, {}, { withCredentials: true });
  }

  getAllUsers() {
    return this.http.post(`${this.uri}/getAllUsers`, {}, { withCredentials: true });
  }
  
  getAllWorkshops() {
    return this.http.post(`${this.uri}/getAllWorkshops`, {}, { withCredentials: true });
  }

  getWorkshopRequestsOrg() {
    return this.http.post(`${this.uri}/getWorkshopRequestsOrg`, {}, { withCredentials: true });
  }

  getWorkshopRequestsUser() {
    return this.http.post(`${this.uri}/getWorkshopRequestsUser`, {}, { withCredentials: true });
  }

  approveWorkshop(workshopId) {
    const data = {
      workshopId: workshopId
    }
    return this.http.post(`${this.uri}/approveWorkshop`, data, { withCredentials: true });
  }

  setUserToOrg(userId) {
    const data = {
      userId: userId
    }
    return this.http.post(`${this.uri}/setUserToOrg`, data, { withCredentials: true });
  }
  
}
