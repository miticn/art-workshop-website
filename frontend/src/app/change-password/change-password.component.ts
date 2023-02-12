import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';
import { confirmPasswordValidator } from '../validators/confirmPasswordValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private activatedRoute : ActivatedRoute,private userService: UsersService, private modalService: ModalService) { }

  ngOnInit(): void {
  }
  
  changePasswordForm = new FormGroup({
    oldPassword : new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern("^(?=.*[A-Z])([A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]+$")]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: [confirmPasswordValidator]});
  validToken:boolean = false;
  token:string;
  changePassword(){
    //send new password to backend to reset password
    this.userService.changePassword(this.changePasswordForm.value.oldPassword,this.changePasswordForm.value.password).subscribe((res:any)=>{
      console.log(res);
      if(res.message == "ok"){
        this.modalService.set("Uspesna promena lozinke","Lozinka je uspesno promenjena !",()=>{
          this.router.navigate(['/']);
        });
        this.modalService.openModal();
      }
      else{
        this.modalService.set("Neuspesna promena lozinke","Stara lozinka nije tačna!");
        this.modalService.openModal();
      }
    });
  }

}
