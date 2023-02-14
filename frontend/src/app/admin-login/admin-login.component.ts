import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private service: UsersService, private router: Router, private modalService : ModalService) { }

  ngOnInit(): void {
  }
  msg: string = "";
  username: string = "";
  password: string = "";
  loggedin: boolean = false;
  LogIn(){
    this.service.loginAdmin(this.username, this.password).subscribe((res: any) => {
      location.reload();
    }, (err) => {
      this.modalService.set('Prijava nije uspela.', 'Pogrešno korisničko ime ili lozinka. Molimo pokušajte ponovo.');
      this.modalService.openModal();
    });
  }
  
}
