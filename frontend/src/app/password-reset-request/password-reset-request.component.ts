import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  resetPasswordRequestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetPasswordRequest(){
    this.userService.resetPasswordRequest(this.resetPasswordRequestForm.value.email).subscribe((res) => {});
  }
  
}
