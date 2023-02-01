import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { confirmPasswordValidator } from '../validators/confirmPasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: UsersService) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    /**/username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    /**/phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    /**/email: new FormControl('', [Validators.required, Validators.email]),
    /**/password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    confirmPassword: new FormControl('', [Validators.required]),
    organizer: new FormControl(false, []),
    organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9\s]*")]),
    matNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z\s]*")]),
    city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z\s]*")]),
    postNumber: new FormControl('', [Validators.required, Validators.maxLength(10) , Validators.pattern("[0-9A-Z]*")]),
    street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z\s]*")]),
    streetNumber: new FormControl('', [Validators.required,Validators.maxLength(6), Validators.pattern("[0-9]*[a-zA-Z]?]")]),
    profilePicture: new FormControl('', []),
    profilePicutreFile: new FormControl(null, [Validators.required])
  }, { validators: confirmPasswordValidator });
  message:string;
  organizer:boolean;

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        profilePicutreFile: file
      });
    }
  }

  register(){
    this.service.isUsernameFree(this.registerForm.value.username).subscribe((res:any) => {
      alert("Username "+res['free']);
    });
    this.service.isEmailFree(this.registerForm.value.email).subscribe((res:any) => {
      alert("Email "+res['free']);
    });
    alert(JSON.stringify(this.registerForm.errors))
    this.service.register(this.registerForm.value).subscribe((res:any) => {
      this.message = res['message'];
      alert(this.message);
    });
    this.service.uploadProfilePicture(this.registerForm.value.username, this.registerForm.get('profilePicutreFile').value)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
  };

}
