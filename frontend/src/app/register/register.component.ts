import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { UsersService } from '../services/users.service';
import { confirmPasswordValidator } from '../validators/confirmPasswordValidator';
import { emailValidator } from '../validators/emailValidator';
import { usernameValidator } from '../validators/usernameValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: UsersService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-z]*")]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")],[usernameValidator(this.service)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[+]?[0-9]{5,15}$")]),
    email: new FormControl('', [Validators.required, Validators.email], [emailValidator(this.service)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("^(?=.*[A-Z])([A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]+$")]),
    confirmPassword: new FormControl('', [Validators.required]),
    profilePicture: new FormControl('', [Validators.pattern("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")]),
    profilePicutreFile: new FormControl(null, []),
    imageDimensionsX: new FormControl(100, [Validators.max(300), Validators.min(100)]),
    imageDimensionsY: new FormControl(100, [Validators.max(300), Validators.min(100)]),
    organizer: new FormControl(false, []),
    }, { validators: [confirmPasswordValidator]});

  orgForm = new FormGroup({
    organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
    matNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[A-Z][a-zA-Z ]*")]),
    city: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z ]*$")]),
    postNumber: new FormControl('', [Validators.required, Validators.maxLength(10) , Validators.pattern("[0-9A-Z]*")]),
    street: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    streetNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*([a-zA-Z]\.? ?)*$")]),
  });
  message:string;
  organizer:boolean;
  @ViewChild('canvas', { static: false }) canvas
  onFileChange(event) {
    //console.log(this.registerForm.controls);
    //console.log("Register form validation: ", this.registerForm.valid);
    //alert(this.registerForm.controls.profilePicture.valid)
    if (event.target.files.length == 0){
      this.registerForm.controls.imageDimensionsX.setValue(100);
      this.registerForm.controls.imageDimensionsY.setValue(100);
      this.registerForm.controls.profilePicutreFile.setValue(null);
    }
    else if (event.target.files.length > 0 && this.registerForm.controls.profilePicture.valid) {
      const file = event.target.files[0];
      this.registerForm.patchValue({
        profilePicutreFile: file
      });
      const canvas = this.canvas.nativeElement;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        this.registerForm.controls.imageDimensionsX.setValue(image.width);
        this.registerForm.controls.imageDimensionsY.setValue(image.height);
        console.log('Image dimensions:', this.registerForm.value.imageDimensionsX, this.registerForm.value.imageDimensionsY);
        console.log(this.registerForm.controls.imageDimensionsX.errors)
      };
    }
    if(!this.registerForm.controls.profilePicture.valid){
      this.registerForm.controls.imageDimensionsX.setValue(100);
      this.registerForm.controls.imageDimensionsY.setValue(100);
    }
  }

  register(){
    alert(JSON.stringify(this.registerForm.errors))
    /*this.service.register(this.registerForm.value, this.registerForm.get('profilePicutreFile').value).subscribe((res:any) => {
      this.message = res['message'];
      alert(this.message);
      this.modal.openModal();
      //this.customModal.openModal();
    });*/
    
  };
}
