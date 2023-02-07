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
    return this.http.post(`${this.uri}/login`, data, { withCredentials: true });
  }

  loginAdmin(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/loginAdmin`, data, { withCredentials: true });
  }

  getUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getUser`, data, { withCredentials: true });
  }

  getSessionUser() {
    return this.http.post(`${this.uri}/getSessionUser`, {}, { withCredentials: true });
  }

  isUsernameFree(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/isUsernameFree`, data, { withCredentials: true });
  }

  isEmailFree(email) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/isEmailFree`, data, { withCredentials: true });
  }

  uploadProfilePicture(username, profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture, profilePicture.name);
      formData.append('username', username);
      return this.http.post(`${this.uri}/uploadProfilePicture`, formData, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true
      });
  }

  register(registerForm, profilePicture) {
      const formData = new FormData();
      console.log(registerForm.firstname)
      formData.set('firstname', registerForm.firstname);
      formData.set('lastname', registerForm.lastname);
      formData.set('username', registerForm.username);
      formData.set('password', registerForm.password);
      formData.set('email', registerForm.email);
      if (registerForm.organizer == true) {
        formData.set('type', 'org');
      } else {
        formData.set('type', 'user');
      }
      if(profilePicture != null) 
        formData.append('file', profilePicture, profilePicture.name);
      return this.http.post(`${this.uri}/register`, formData, {
        reportProgress: true,
        observe: 'events',
        withCredentials: true
      });
  }

  isTokenValid(token) {
    const data = {
      token: token
    }
    return this.http.post(`${this.uri}/isTokenValid`, data, { withCredentials: true });
  }

  setNewResetPassword(token, password) {
    alert(token + " " + password)
    const data = { 
      token: token,
      password: password
    }
    return this.http.post(`${this.uri}/setNewResetPassword`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.uri}/logout`, {}, { withCredentials: true });
  }

  resetPasswordRequest(email) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/resetPasswordRequest`, data, { withCredentials: true });
  }
}
