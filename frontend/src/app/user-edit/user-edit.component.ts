import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Helper } from '../helper';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { emailValidator } from '../validators/emailValidator';
import { usernameValidator } from '../validators/usernameValidator';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-z]*")]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Z][a-zA-Z]*")]),
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")],[usernameValidator(this.userService)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[+]?[0-9]{5,15}$")]),
    email: new FormControl('', [Validators.required, Validators.email], [emailValidator(this.userService)]),
    profilePicture: new FormControl('', [Validators.pattern("^.+\.(jpg|png|jpeg|JPG|PNG|JPEG)$")]),
    profilePicutreFile: new FormControl(null, []),
    imageDimensionsX: new FormControl(100, [Validators.max(300), Validators.min(100)]),
    imageDimensionsY: new FormControl(100, [Validators.max(300), Validators.min(100)]),
    organizer: new FormControl(false, []),
    });

  orgForm = new FormGroup({
    organizationName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
    matNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[A-Z][a-zA-Z ]*")]),
    city: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z ]*$")]),
    postNumber: new FormControl('', [Validators.required, Validators.maxLength(10) , Validators.pattern("[0-9A-Z]*")]),
    street: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    streetNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*([a-zA-Z]\.? ?)*$")]),
  });


  constructor(private activatedRoute : ActivatedRoute, private userService : UsersService, public helper: Helper) { }
  username: string;
  user: User;
  exists: boolean = true;
  userString: string;
  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUser(this.username).subscribe((data: User) => {
      if(data['error'] == "no user"){
        this.exists = false;
      }
      else{
        this.user = data;
        this.userString = JSON.stringify(this.user);
        this.editForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          username: this.user.username,
          phone: this.user.phone,
          email: this.user.email,
          organizer: this.user.type=="org"
        });     
      }
    });
  }
  edit(){
    
  }

  onFileSelected(event){
    //this.user.image = event.target.files[0];
  }

}
