import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  prijavaNaSistem(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/login`, data);
  }

  dohvatiKorisnika(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data);
  }

}
