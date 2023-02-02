import { Component, OnInit } from '@angular/core';
import { Workshop } from '../models/workshop';
import { WorkshopsService } from '../workshops.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor(private workshopService : WorkshopsService) { }
  workshops : Workshop[] = [];
  ngOnInit(): void {
    this.workshopService.getAll().subscribe((data:Workshop[]) => {
      this.workshops = data;
      console.log(this.workshops);
    });
  }

}
