import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/login`, data);
  }

  getUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data);
  }
  isUsernameFree(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/isUsernameFree`, data);
  }

  isEmailFree(email) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/isEmailFree`, data);
  }

  uploadProfilePicture(username, profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture, profilePicture.name);
      formData.append('username', username);
      return this.http.post(`${this.uri}/uploadProfilePicture`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }

  register(registerForm) {
    console.log(registerForm);
    const data = {
      firstname: registerForm.firstname,
      lastname: registerForm.lastname,
      username: registerForm.username,
      password: registerForm.password,
      email: registerForm.email,
      type: registerForm.type
    }
    return this.http.post(`${this.uri}/register`, data);
  }

  logout() {}
}
