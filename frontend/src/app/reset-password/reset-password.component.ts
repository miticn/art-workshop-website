import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activatedRoute : ActivatedRoute,private userService: UsersService) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    //send token to backend to verify that it is valid
    this.userService.isTokenValid(this.token).subscribe((res:any)=>{
      this.validToken = res.valid;
    });
  }
  
  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("[a-zA-Z0-9]*")]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  validToken:boolean = false;
  token:string;
  ressetPassword(){
    //send new password to backend to reset password
  }

}
