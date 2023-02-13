import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../services/workshops.service';
import { Helper } from '../helper';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private workshopService : WorkshopsService, public photoHepler: Helper, private modalService: ModalService, private auth: AuthService,
    private router: Router) { }
  workshops : Workshop[] = [];
  workshopsAll : Workshop[] = [];
  ngOnInit(): void {
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshops = this.workshopsAll = data;
      console.log(this.workshops);
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
