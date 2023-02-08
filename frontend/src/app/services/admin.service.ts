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
  
}
