import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    organizer: new FormControl(false, []),
    organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z]*")]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z]*")]),
    postNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")]),
    street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z]*")]),
    streetNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    matNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")])
  });
  message:string;
  organizer:boolean;

  profilePicture:string;
  register(){
    alert()
    alert(JSON.stringify(this.registerForm.controls.email.errors))
  };

}
