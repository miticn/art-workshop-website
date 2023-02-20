import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../services/workshops.service';
import { Helper } from '../helper';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private workshopService : WorkshopsService, public photoHepler: Helper, private modalService: ModalService, public auth: AuthService,
    private router: Router, private userService:UsersService) { }
  workshopsSignedUp : Workshop[] = [];
  workshops : Workshop[] = [];
  workshopsAll : Workshop[] = [];
  myUser : User;
  ngOnInit(): void {
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshopsAll = data;
      //remove waiting for approval workshops
      this.workshopsAll = this.workshopsAll.filter(w => w.status == "approved");
      //remove ended workshops
      this.workshopsAll = this.workshopsAll.filter(w => new Date(w.date).getTime() > new Date().getTime());

      this.workshops = this.workshopsAll;
      console.log(this.workshops);
    });
    this.userService.getSessionUser().subscribe((data:any) => {
      this.myUser = data;
      console.log(this.myUser);
      this.workshopService.getWorkshopsUserSignedUp(this.myUser._id).subscribe((data:Workshop[]) => {
        console.log(data);
        this.workshopsSignedUp = data;
      });
    });
  }

  sortWorkshopsByDate(){
    this.workshops.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  sortWorkshopsByName(){
    this.workshops.sort((a,b) => {
      return a.name.localeCompare(b.name);
    });
  }

  searchLocation : string = "";
  searchName : string = "";
  sortBy :string;
  search(){
    this.workshops = this.workshopsAll;
    if (this.searchLocation != null && this.searchLocation != ""){
      this.workshops = this.workshops.filter(w => w.location.toLowerCase().includes(this.searchLocation.toLowerCase()));
    }
    if (this.searchName != null && this.searchName != ""){
      this.workshops = this.workshops.filter(w => w.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
  }

  sort(){
    if (this.sortBy == "date"){
      this.sortWorkshopsByDate();
    }
    else if (this.sortBy == "name"){
      this.sortWorkshopsByName();
    }
  }

  details(workshop : Workshop){
    if (this.auth.isLoggedIn()){
      this.router.navigate(['/workshop', workshop._id]);
    }
    else{
      this.modalService.set('Niste prijavljeni', 'Morate biti prijavljeni da bi ste videli detalje o radionici');
      this.modalService.openModal();
    }
  }
}
