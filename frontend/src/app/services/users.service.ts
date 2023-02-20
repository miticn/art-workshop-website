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

  getUserById(id) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/getUserById`, data, { withCredentials: true });
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

  register(registerForm, orgForm, profilePicture) {
      const formData = new FormData();
      console.log(registerForm.firstname)
      formData.set('firstname', registerForm.firstname);
      formData.set('lastname', registerForm.lastname);
      formData.set('username', registerForm.username);
      formData.set('password', registerForm.password);
      formData.set('phone', registerForm.phone);
      formData.set('email', registerForm.email);
      if (registerForm.organizer == true) {
        formData.set('type', 'org');
        let org = {
          city:orgForm.city,
          country:orgForm.country,
          name:orgForm.organizationName,
          postNumber:orgForm.postNumber,
          regNumber:orgForm.matNumber,
          street:orgForm.street,
          streetNumber:orgForm.streetNumber,
        }
        formData.set('org', JSON.stringify(org));
      } else {
        let org = {
          city:"",
          country:"",
          name:"",
          postNumber:"",
          regNumber:"",
          street:"",
          streetNumber:"",
        }
        formData.set('type', 'user');
        formData.set('org', JSON.stringify(org));
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

  changeUser(editForm, orgForm, profilePicture, usernameOfUserToChange) {
    const formData = new FormData();
    console.log(editForm.firstname)
    formData.set('usernamechange', usernameOfUserToChange);
    formData.set('firstname', editForm.firstname);
    formData.set('lastname', editForm.lastname);
    formData.set('username', editForm.username);
    formData.set('password', editForm.password);
    formData.set('phone', editForm.phone);
    formData.set('email', editForm.email);
    if (editForm.organizer == true) {
      formData.set('type', 'org');
      let org = {
        city:orgForm.city,
        country:orgForm.country,
        name:orgForm.organizationName,
        postNumber:orgForm.postNumber,
        regNumber:orgForm.matNumber,
        street:orgForm.street,
        streetNumber:orgForm.streetNumber,
      }
      formData.set('org', JSON.stringify(org));
    } else {
      formData.set('type', 'user');
      formData.set('org', JSON.stringify({}));
    }
    if(profilePicture != null) 
      formData.append('file', profilePicture, profilePicture.name);
    return this.http.post(`${this.uri}/changeUser`, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials: true
    });
  }
  
  changePassword(oldPassword, newPassword) {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post(`${this.uri}/changePassword`, data, { withCredentials: true });
  }

  getMyLikes() {
    return this.http.post(`${this.uri}/getMyLikes`, {}, { withCredentials: true });
  }

  getMyComments() {
    return this.http.post(`${this.uri}/getMyComments`, {}, { withCredentials: true });
  }

  becomeOrganizer(orgForm) {
    let org = {
      city:orgForm.city,
      country:orgForm.country,
      name:orgForm.organizationName,
      postNumber:orgForm.postNumber,
      regNumber:orgForm.matNumber,
      street:orgForm.street,
      streetNumber:orgForm.streetNumber,
    }
    const data = {
      org: org
    }
    return this.http.post(`${this.uri}/becomeOrganizer`, data, { withCredentials: true });
  }
}
