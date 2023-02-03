import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../workshops.service';
import { PhotoHelper } from '../photoHelper';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private workshopService : WorkshopsService, public photoHepler: PhotoHelper) { }
  workshops : Workshop[] = [];
  ngOnInit(): void {
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshops = data;
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

  searchPlace : string;
  searchName : string;
  sortBy :string;
  search(){

  }

}
