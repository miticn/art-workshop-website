import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UsersService = class UsersService {
    constructor(http) {
        this.http = http;
        this.uri = 'http://localhost:4000/users';
    }
    login(username, password) {
        const data = {
            username: username,
            password: password
        };
        return this.http.post(`${this.uri}/login`, data, { withCredentials: true });
    }
    loginAdmin(username, password) {
        const data = {
            username: username,
            password: password
        };
        return this.http.post(`${this.uri}/loginAdmin`, data, { withCredentials: true });
    }
    getUser(username) {
        const data = {
            username: username
        };
        return this.http.post(`${this.uri}/getUser`, data, { withCredentials: true });
    }
    getSessionUser() {
        return this.http.post(`${this.uri}/getSessionUser`, {}, { withCredentials: true });
    }
    isUsernameFree(username) {
        const data = {
            username: username
        };
        return this.http.post(`${this.uri}/isUsernameFree`, data, { withCredentials: true });
    }
    isEmailFree(email) {
        const data = {
            email: email
        };
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
    register(registerForm) {
        console.log(registerForm);
        const data = {
            firstname: registerForm.firstname,
            lastname: registerForm.lastname,
            username: registerForm.username,
            password: registerForm.password,
            email: registerForm.email,
            type: registerForm.type
        };
        return this.http.post(`${this.uri}/register`, data, { withCredentials: true });
    }
    isTokenValid(token) {
        const data = {
            token: token
        };
        return this.http.post(`${this.uri}/isTokenValid`, data, { withCredentials: true });
    }
    setNewResetPassword(token, password) {
        alert(token + " " + password);
        const data = {
            token: token,
            password: password
        };
        return this.http.post(`${this.uri}/setNewResetPassword`, data, { withCredentials: true });
    }
    logout() {
        return this.http.post(`${this.uri}/logout`, {}, { withCredentials: true });
    }
    resetPasswordRequest(email) {
        const data = {
            email: email
        };
        return this.http.post(`${this.uri}/resetPasswordRequest`, data, { withCredentials: true });
    }
};
UsersService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map